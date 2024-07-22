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

      // let totalOrderAmount = 0
      // let nbOfNoShowOrder = 0
      // orders.forEach((order) => {
      //   if (order.$original.stateId === States.NOSWHOW) {
      //     nbOfNoShowOrder += 1
      //   }

      //   totalOrderAmount += Number(order.orderPrice)
      // })

      // const ratio = Number.parseInt(((nbOfNoShowOrder * 100) / orders.length).toFixed(0))

      // const notation = () => {
      //   if (ratio === 0) return 1
      //   else if (ratio > 0 && ratio <= 10) return 2
      //   else return 3
      // }

      const customerOrders = await this.updateNotation(customer.id, false)

      const customerData: ResponseAllCustomers = {
        customer: customer,
        ordersCount: customer.$extras.orders_count,
        lastOrderDate: DateTime.fromISO(orders[orders.length - 1].pickupDate.toString())
          .setLocale('fr')
          .toFormat('dd LLLL yyyy'),
        totalOrderAmount: customerOrders.totalOrderAmount.toFixed(2),
        nbOfNoShowOrder: customerOrders.nbOfNoShowOrder,
        notation: customerOrders.notation,
      }

      result.push(customerData)
    }
    return result
  }

  async updateNotation(
    customerId: number,
    edit: boolean
  ): Promise<{ notation: number; totalOrderAmount: number; nbOfNoShowOrder: number }> {
    const customer = await Customer.findOrFail(customerId)
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

    let notation
    if (ratio === 0) notation = 1
    else if (ratio > 0 && ratio <= 10) notation = 2
    else notation = 3

    if (edit) {
      customer.notation = notation
      await customer.save()
    }

    return {
      notation,
      totalOrderAmount,
      nbOfNoShowOrder,
    }
  }

  async getNotation(str: string, userId: number): Promise<Customer | null> {
    // const customer = await Customer.query().whereHas('users', (userQuery) => {
    //   userQuery.where('id', userId).whereILike('email', `%${str}%`).first()
    // })
    const user = await User.findOrFail(userId)

    // const toto = `%${str}%`

    const customer = await user
      .related('customers')
      .query()
      .where('email', 'LIKE', `%${str}%`)
      .first()

    return customer
  }
}

export default new CustomerService()
