import Customer from '#models/customer'
import User from '#models/user'
import Notation from '#models/notation'
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
    userId: number,
    state: number,
    edit: boolean
  ): Promise<boolean> {
    const notation = await Notation.query()
      .where('customer_id', customerId)
      .andWhere('user_id', userId)
      .first()

    let notationUpdated = null

    if (notation) {
      let nbOrderUpdated = notation.nbOrdersCompleted + 1
      let nbNoShowUpdated = notation.nbNoShow + 1

      notation.nbOrdersCompleted = nbOrderUpdated
      if (state === States.NOSWHOW) notation.nbNoShow = nbNoShowUpdated

      const ratio = Number.parseInt(((nbNoShowUpdated * 100) / nbOrderUpdated).toFixed(0))

      if (ratio === 0) notation.notation = 1
      else if (ratio > 0 && ratio <= 10) notation.notation = 2
      else notation.notation = 3

      await notation.save()
    }

    return notationUpdated !== null
  }

  async getNotation(str: string, userId: number): Promise<Notation | null> {
    const user = await User.findOrFail(userId)

    const customer = await user
      .related('customers')
      .query()
      .where('email', 'LIKE', `%${str}%`)
      .first()

    let notation = null

    if (customer) {
      notation = await Notation.query()
        .where('customer_id', customer?.id)
        .andWhere('user_id', userId)
        .first()
    }

    return notation
  }
}

export default new CustomerService()
