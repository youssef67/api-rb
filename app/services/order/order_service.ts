import Order from '#models/order'
import env from '#start/env'
import { DateTime } from 'luxon'
import EmailOrder from '#services/email/email_order'
import { tokenUtils } from '../../utils/token_utils.js'
import OrderToken from '#models/order_token'
import type { ColumnsCustomer, UpdateRequest } from '#controllers/interfaces/order.interface'

import Customer from '#models/customer'
import CustomerService from '#services/customer/customer_service'


class OrderService {
  async add(
    amount: number,
    pickupDate: string,
    pickupTime: string,
    customer: Customer,
    rest: ColumnsCustomer
  ) {
    const date = DateTime.fromISO(pickupDate, { zone: 'Europe/Paris', locale: 'fr' })
    const time = DateTime.fromISO(pickupTime, { zone: 'Europe/Paris', locale: 'fr' })

    const timeForSQL = `${time.hour}:${time.minute === 0 ? '00' : time.minute}:00`

    const pickupDateSQL = date.toSQL({ includeOffset: false })

    const order = await Order.create({
      orderPrice: amount,
      pickupDate: pickupDateSQL,
      pickupTime: timeForSQL,
      stateId: 2,
      customerId: customer.id,
      userId: rest.userId,
      detailsForCustomer: rest.detailsForCustomer ?? '',
      detailsForUser: rest.detailsForUser ?? '',
    })

    await order.save()

    const token = tokenUtils.generateToken()
    const expiresAt = DateTime.now().plus({ days: 2 })

    await OrderToken.create({ orderId: order.id, token: token, expiresAt: expiresAt })

    await EmailOrder.sendEmailForOrder(
      customer.email,
      amount,
      pickupDate,
      rest.detailsForCustomer,
      token,
      order.id,
      env.get('BASE_URL')
    )

    return order
  }

  async update(payload: UpdateRequest) {
    const order = await Order.findOrFail(payload.orderId)

    // const pickupDateFormat = DateTime.fromFormat(payload.pickupDate, 'dd/MM/yyyy', { locale: 'fr' })
    const date = DateTime.fromISO(payload.pickupDate, { zone: 'Europe/Paris', locale: 'fr' })
    const time = DateTime.fromISO(payload.pickupTime, { zone: 'Europe/Paris', locale: 'fr' })

    const pickupDateSQL = date.toSQL({ includeOffset: false })
    const timeForSQL = `${time.hour}:${time.minute === 0 ? '00' : time.minute}:00`

    order.orderPrice = payload.amount
    order.pickupDate = pickupDateSQL
    order.pickupTime = timeForSQL
    order.detailsForCustomer = payload.detailsForCustomer ?? ''
    order.detailsForUser = payload.detailsForUser ?? ''

    await order.save()

    return order
  }

  async udapteStatus(orderId: number, action: string): Promise<Order | null> {
    const order = await Order.findOrFail(orderId)

    switch (action) {
      case 'recovered':
        order.stateId = 3
        break
      case 'noShow':
        order.stateId = 4
        break
      case 'canceled':
        order.stateId = 5
        break
    }

    await order.save()

    //Edit notation for customer
    CustomerService.updateNotation(order.customerId, true)

    return order
  }

  async getDayOrders(userId: number): Promise<Order[]> {
    const today = DateTime.now().toISODate()

    const orders = await Order.query()
      .where('user_id', '=', userId)
      .whereNotIn('state_id', [3, 4, 5])
      .whereRaw('DATE(pickup_date) = ?', [today])
      .preload('customer')

    return orders
  }

  async getAllOrders(userId: number): Promise<Order[]> {
    const orders = await Order.query()
      .where('user_id', '=', userId)
      .whereNotIn('state_id', [3, 4, 5])
      .preload('customer')

    return orders
  }

  async getHistoryOrders(userId: number): Promise<Order[]> {
    const orders = await Order.query()
      .where('user_id', '=', userId)
      .whereNotIn('state_id', [1, 2])
      .preload('customer')

    return orders
  }

  async orderConfirmation(token: string, orderId: string): Promise<boolean> {
    const confirmationToken = await OrderToken.query()
      .whereHas('order', (query) => {
        query.where('id', orderId)
      })
      .andWhere('token', token)
      .andWhere('expiresAt', '>', DateTime.now().toSQL())
      .first()

    if (!confirmationToken) {
      return false
    }

    const order = await Order.findOrFail(confirmationToken.orderId)

    order.stateId = 1
    await order.save()
    return true
  }
}

export default new OrderService()
