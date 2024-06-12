import type { HttpContext } from '@adonisjs/core/http'
import type { OrderRequest } from '#controllers/interfaces/order.interface'
import { addOrderValidator, OrderIdValidator } from '#validators/order'
import OrderService from '#services/order/order_service'
import CustomerService from '#services/customer/customer_service'

export default class OrdersController {
  async add({ request, response }: HttpContext) {
    try {
      const payload: OrderRequest = await request.validateUsing(addOrderValidator)
      const { amount, pickupDate, ...columnsCustomer } = payload

      const customer = await CustomerService.checkIfCustomerExists(columnsCustomer)

      const order = await OrderService.add(amount, pickupDate, customer, columnsCustomer.userId)

      return response.status(201).json(order)
    } catch (error) {
      return response.badRequest({ message: 'Cannot record order' })
    }
  }

  async recoveredOrder({ request, response }: HttpContext) {
    const payload: { orderId: number } = await request.validateUsing(OrderIdValidator)

    const order = await OrderService.recoveredOrder(payload.orderId)

    return response.status(200).json(order)
  }

  async canceledOrder({ request, response }: HttpContext) {
    const payload: { orderId: number } = await request.validateUsing(OrderIdValidator)

    const order = await OrderService.canceledOrder(payload.orderId)

    return response.status(200).json(order)
  }

  async getDayOrders({ request, response }: HttpContext) {
    const orders = await OrderService.getDayOrders(request.qs().userId)

    return response.status(200).json(orders)
  }
}
