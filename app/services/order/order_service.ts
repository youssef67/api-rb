import Order from '#models/order'
import { DateTime } from 'luxon'
import EmailOrder from '#services/email/email_order'
import Customer from '#models/customer'

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
      customerId: customer.id,
      userId: userId,
    })
    await order.save()

    await EmailOrder.sendEmailForOrder(customer.email, amount, pickupDate)

    return order
  }
}

export default new OrderService()
