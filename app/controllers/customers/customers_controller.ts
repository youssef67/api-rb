import type { HttpContext } from '@adonisjs/core/http'

import CustomerService from '#services/customer/customer_service'

export default class CustomersController {
  async getAllCustomers({ request, response }: HttpContext) {
    const customers = await CustomerService.getAllCustomers(request.qs().userId)

    // customers.forEach((customer) => {
    //   console.log(customer.lastOrderDate)
    // })

    return response.status(200).json(customers)
  }
}
