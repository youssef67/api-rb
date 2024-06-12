import Order from '#models/order'
import { DateTime } from 'luxon'
import EmailOrder from '#services/email/email_order'
import Customer from '#models/customer'
import State from '#models/state'

class OrderService {
  async add(
    amount: number,
    pickupDate: string,
    customer: Customer,
    userId: number
  ): Promise<Order> {
    const pickupDateFormat = DateTime.fromFormat(pickupDate, 'dd/MM/yyyy', { locale: 'fr' })

    const order = await Order.create({
      orderPrice: amount,
      pickupDate: pickupDateFormat.isValid ? pickupDateFormat.toSQLDate() : null,
      stateId: 2,
      customerId: customer.id,
      userId: userId,
    })
    await order.save()

    await EmailOrder.sendEmailForOrder(customer.email, amount, pickupDate)

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
