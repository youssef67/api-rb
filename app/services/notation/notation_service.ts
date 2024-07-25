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

class NotationService {
  async updateNotation(
    customerId: number,
    userId: number,
    state: number,
    price: number
  ): Promise<Notation> {
    const notation = await Notation.query()
      .where('customer_id', customerId)
      .andWhere('user_id', userId)
      .first()

    if (notation) {
      let nbOrderUpdated = notation.nbOrdersCompleted + 1
      let nbNoShowUpdated = notation.nbNoShow + 1
      let totalUpdated = notation.totalAmountOrdersCompleted + price

      notation.nbOrdersCompleted = nbOrderUpdated
      if (state === States.NOSWHOW) notation.nbNoShow = nbNoShowUpdated
      else notation.totalAmountOrdersCompleted = totalUpdated

      const ratio = Number.parseInt(((nbNoShowUpdated * 100) / nbOrderUpdated).toFixed(0))

      if (ratio === 0) notation.notation = 1
      else if (ratio > 0 && ratio <= 10) notation.notation = 2
      else notation.notation = 3

      await notation.save()
      return notation
    } else {
      return await this.createNotation(customerId, userId, state, price)
    }
  }

  async createNotation(customerId: number, userId: number, state: number, price: number) {
    const newNotation = new Notation()
    newNotation.customerId = customerId
    newNotation.userId = userId
    newNotation.nbNoShow = state === States.NOSWHOW ? 1 : 0
    newNotation.nbOrdersCompleted = 1
    newNotation.notation = state === States.NOSWHOW ? 3 : 0
    newNotation.totalAmountOrdersCompleted = price

    await newNotation.save()
    return newNotation
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

export default new NotationService()
