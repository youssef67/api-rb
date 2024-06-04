import type { HttpContext } from '@adonisjs/core/http'
import type { OrderRequest } from '#controllers/interfaces/order.interface'
import { orderValidator } from '#validators/order'
import { DateTime } from 'luxon'
import OrderService from '#services/order/order_service'

export default class OrdersController {
  async add({ request, response }: HttpContext) {
    // try {
    const payload: OrderRequest = await request.validateUsing(orderValidator)
    const pickupDate = DateTime.fromISO(payload.pickupDate).setLocale('fr').toFormat('dd/MM/yyyy')
    const order = await OrderService.add({ ...payload, pickupDate })

    return response.status(201).json(order)
    // } catch (error) {
    // return response.badRequest({ message: 'Cannot record order' })
    // }
  }
}
