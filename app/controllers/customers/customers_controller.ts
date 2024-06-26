import type { HttpContext } from '@adonisjs/core/http'

import CustomerService from '#services/customer/customer_service'

export default class CustomersController {
  async getAllCustomers({ request, response }: HttpContext) {
    const orders = await CustomerService.getAllCustomers(request.qs().userId)

    return response.status(200).json(orders)
  }
}
