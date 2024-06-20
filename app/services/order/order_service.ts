import Order from '#models/order'
import { DateTime } from 'luxon'
import EmailOrder from '#services/email/email_order'
import type { ColumnsCustomer, UpdateRequest } from '#controllers/interfaces/order.interface'

import Customer from '#models/customer'

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
    await EmailOrder.sendEmailForOrder(customer.email, amount, pickupDate, rest.detailsForCustomer)
    return order
  }

  async update(payload: UpdateRequest) {
    const order = await Order.findOrFail(payload.orderId)

    // const pickupDateFormat = DateTime.fromFormat(payload.pickupDate, 'dd/MM/yyyy', { locale: 'fr' })
    const date = DateTime.fromISO(payload.pickupDate, { zone: 'Europe/Paris', locale: 'fr' })
    const time = DateTime.fromISO(payload.pickupTime, { zone: 'Europe/Paris', locale: 'fr' })

    const pickupDateSQL = date.toSQL({ includeOffset: false })
    const timeForSQL = `${time.hour}:${time.minute === 0 ? '00' : time.minute}:00`

    console.log(date)
    console.log(time)
    order.orderPrice = payload.amount
    order.pickupDate = pickupDateSQL
    order.pickupTime = timeForSQL
    order.detailsForCustomer = payload.detailsForCustomer ?? ''
    order.detailsForUser = payload.detailsForUser ?? ''

    await order.save()

    return order
  }

  async recoveredOrder(orderId: number): Promise<Order | null> {
    const order = await Order.findOrFail(orderId)
    order.stateId = 3
    await order.save()

    return order
  }

  async canceledOrder(orderId: number): Promise<Order | null> {
    const order = await Order.findOrFail(orderId)
    order.stateId = 4
    await order.save()

    return order
  }

  async getDayOrders(userId: number): Promise<Order[]> {
    const orders = await Order.query()
      .where('user_id', '=', userId)
      .whereNotIn('state_id', [3, 4])
      .preload('customer')

    return orders
  }
}

export default new OrderService()
