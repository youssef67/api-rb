import Customer from '#models/customer'
import User from '#models/user'
import { CustomerRequest, ResponseAllCustomers } from '#controllers/interfaces/customer.interface'
import { DateTime } from 'luxon'

class CustomerService {
  async checkIfCustomerExists(payload: CustomerRequest) {
    try {
      const { userId, ...rest } = payload

      const user = await User.findOrFail(userId)

      let customer = await Customer.findBy('email', rest.email)

      if (!customer) {
        customer = new Customer()
        customer.email = rest.email
        customer.phone = rest.phone
        customer.name = rest.name
        customer.lastname = rest.lastname
        await customer.save()
      }

      const isCustomerLinked = await user
        .related('customers')
        .query()
        .where('customer_id', customer.id)
        .first()

      console.log(isCustomerLinked)

      if (!isCustomerLinked) await user.related('customers').attach([customer.id])

      return customer
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateCustomer() {}

  async getAllCustomers(userId: number): Promise<ResponseAllCustomers[]> {
    const user = await User.findOrFail(userId)
    const customers = await user.related('customers').query().withCount('orders')

    let result: ResponseAllCustomers[] = []

    for (const customer of customers) {
      const orders = await customer.related('orders').query()

      let totalOrderAmount = 0
      orders.forEach((order) => {
        totalOrderAmount += Number(order.orderPrice)
      })

      const customerData: ResponseAllCustomers = {
        customer: customer,
        ordersCount: customer.$extras.orders_count,
        lastOrderDate: DateTime.fromISO(orders[orders.length - 1].pickupDate.toString())
          .setLocale('fr')
          .toFormat('dd LLLL yyyy'),
        totalOrderAmount: totalOrderAmount.toFixed(2),
      }

      result.push(customerData)
    }
    return result
  }
}

export default new CustomerService()
