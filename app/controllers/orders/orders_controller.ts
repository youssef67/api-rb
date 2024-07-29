import type { HttpContext } from '@adonisjs/core/http'
import type { OrderRequest, UpdateRequest } from '#controllers/interfaces/order.interface'
import {
  addOrderValidator,
  OrderIdValidator,
  updateOrderValidator,
  OrderIdValidatorAll,
} from '#validators/order'
import OrderService from '#services/order/order_service'

import CustomerService from '#services/customer/customer_service'

export default class OrdersController {
  async add({ request, response }: HttpContext) {
    try {
      const payload: OrderRequest = await request.validateUsing(addOrderValidator)

      const { amount, pickupDate, pickupTime, ...rest } = payload

      const customer = await CustomerService.checkIfCustomerExists(rest, amount)

      const order = await OrderService.add(amount, pickupDate, pickupTime, customer, rest)

      return response.status(201).json(order)
    } catch (error) {
      return response.badRequest({ message: 'Cannot record order' })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const payload: UpdateRequest = await request.validateUsing(updateOrderValidator)

      const order = await OrderService.update(payload)
      return response.status(201).json(order)
    } catch (error) {
      return response.badRequest({ message: 'Cannot update order' })
    }
  }

  async updateStatus({ request, response }: HttpContext) {
    const payload: { orderId: number; action: string } =
      await request.validateUsing(OrderIdValidator)

    const order = await OrderService.udapteStatus(payload.orderId, payload.action)

    return response.status(200).json(order)
  }

  async updateStatusAll({ request, response }: HttpContext) {
    const payload: { orderIds: number[]; action: string } =
      await request.validateUsing(OrderIdValidatorAll)

    const order = await OrderService.updateStatusAll(payload.orderIds, payload.action)

    return response.status(200).json(order)
  }

  async getDayOrders({ request, response }: HttpContext) {
    const orders = await OrderService.getDayOrders(request.qs().userId)

    return response.status(200).json(orders)
  }

  async getAllOrders({ request, response }: HttpContext) {
    const orders = await OrderService.getAllOrders(request.qs().userId)

    return response.status(200).json(orders)
  }

  async getHistoryOrders({ request, response }: HttpContext) {
    const orders = await OrderService.getHistoryOrders(request.qs().userId)

    return response.status(200).json(orders)
  }

  async orderConfirmation({ request, response }: HttpContext) {
    try {
      const orderId: string = request.input('id')
      const token: string = request.input('token')

      await OrderService.orderConfirmation(token, orderId)

      return response.status(200)
    } catch (error) {
      return response.status(400)
    }
  }
}
