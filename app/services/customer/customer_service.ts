import Customer from '#models/customer'
import User from '#models/user'
import {
  CustomerRequest,
  ResponseAllCustomers,
  UpdateRequest,
} from '#controllers/interfaces/customer.interface'
import { DateTime } from 'luxon'
import States from '../../enums/states.js'

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

        const isCustomerLinked = await user
          .related('customers')
          .query()
          .where('customer_id', customer.id)
          .first()

        if (!isCustomerLinked) await user.related('customers').attach([customer.id])
      }

      return customer
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async update(payload: UpdateRequest) {
    const customer = await Customer.findOrFail(payload.customerId)

    customer.name = payload.name
    customer.lastname = payload.lastname
    customer.email = payload.email
    customer.phone = payload.phone

    await customer.save()

    return customer
  }

  async getAllCustomers(userId: number): Promise<ResponseAllCustomers[]> {
    const user = await User.findOrFail(userId)
    const customers = await user.related('customers').query().withCount('orders')

    let result: ResponseAllCustomers[] = []

    for (const customer of customers) {
      const orders = await customer.related('orders').query()

      let totalOrderAmount = 0
      let nbOfNoShowOrder = 0
      orders.forEach((order) => {
        if (order.$original.stateId === States.NOSWHOW) {
          nbOfNoShowOrder += 1
        }

        totalOrderAmount += Number(order.orderPrice)
      })

      const ratio = Number.parseInt(((nbOfNoShowOrder * 100) / orders.length).toFixed(0))

      const notation = () => {
        if (ratio === 0) return 1
        else if (ratio > 0 && ratio <= 10) return 2
        else return 3
      }

      const customerData: ResponseAllCustomers = {
        customer: customer,
        ordersCount: customer.$extras.orders_count,
        lastOrderDate: DateTime.fromISO(orders[orders.length - 1].pickupDate.toString())
          .setLocale('fr')
          .toFormat('dd LLLL yyyy'),
        totalOrderAmount: totalOrderAmount.toFixed(2),
        nbOfNoShowOrder: nbOfNoShowOrder,
        notation: notation(),
      }

      result.push(customerData)
    }
    return result
  }
}

export default new CustomerService()
