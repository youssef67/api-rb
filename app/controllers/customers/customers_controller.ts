import type { HttpContext } from '@adonisjs/core/http'

import CustomerService from '#services/customer/customer_service'
import type { UpdateRequest, NotationRequest } from '#controllers/interfaces/customer.interface'
import { updateCustomerValidator, NotationValidator } from '#validators/customer'

export default class CustomersController {
  async getAllCustomers({ request, response }: HttpContext) {
    try {
      const customers = await CustomerService.getAllCustomers(request.qs().userId)
      return response.status(200).json(customers)
    } catch (error) {
      return response.badRequest({ message: 'Cannot get all customer' })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const payload: UpdateRequest = await request.validateUsing(updateCustomerValidator)

      const customer = await CustomerService.update(payload)

      return response.status(201).json(customer)
    } catch (error) {
      return response.badRequest({ message: 'Cannot update customer' })
    }
  }

  async getNotationByEmail({ request, response }: HttpContext) {
    const payload: NotationRequest = await request.validateUsing(NotationValidator)

    const customer = await CustomerService.getNotation(payload.str, payload.userId)

    if (customer !== null) {
      return response.status(200).json(customer)
    }
    // const notation = await CustomerService.getNotation(request.qs().str)
    // return response.status(200).json(notation)
  }
}
