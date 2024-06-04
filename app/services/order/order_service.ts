import Order from '#models/order'
import Customer from '#models/customer'
import type { OrderRequest } from '#controllers/interfaces/order.interface'
import { DateTime } from 'luxon'
import EmailOrder from '#services/email/email_order'

class OrderService {
  async add(payload: OrderRequest) {
    const { amount, pickupDate, ...columnsCustomer } = payload
    const customer = await Customer.firstOrNew(columnsCustomer)
    customer.save()

    const pickupDateToDateTime = DateTime.fromFormat(pickupDate, 'dd/MM/yyyy')

    if (!pickupDateToDateTime.isValid) {
      throw new Error('Invalid pickup date')
    }

    const order = await Order.create({
      orderPrice: amount,
      pickupDate: pickupDateToDateTime.toSQLDate(),
      customerId: customer.id,
    })
    await order.save()

    await EmailOrder.sendEmailForOrder(customer.email, amount, pickupDate)

    return order
  }
}

export default new OrderService()
