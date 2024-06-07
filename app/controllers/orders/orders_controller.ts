import type { HttpContext } from '@adonisjs/core/http'
import type { OrderRequest } from '#controllers/interfaces/order.interface'
import { orderValidator } from '#validators/order'
import OrderService from '#services/order/order_service'
import CustomerService from '#services/customer/customer_service'

export default class OrdersController {
  async add({ request, response }: HttpContext) {
    try {
      const payload: OrderRequest = await request.validateUsing(orderValidator)
      const { amount, pickupDate, ...columnsCustomer } = payload

      const customer = await CustomerService.checkIfCustomerExists(columnsCustomer)

      const order = await OrderService.add(amount, pickupDate, customer, columnsCustomer.userId)

      return response.status(201).json(order)
    } catch (error) {
      return response.badRequest({ message: 'Cannot record order' })
    }
  }

  async getDayOrders({ request, response, params }: HttpContext) {
    const orders = await OrderService.getDayOrders(request.qs().userId)

    return orders.length > 0 ? response.status(200).json(orders) : response.status(204)
  }
}
