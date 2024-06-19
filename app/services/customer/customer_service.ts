import Customer from '#models/customer'
import User from '#models/user'
import { CustomerRequest } from '#controllers/interfaces/customer.interface'

class CustomerService {
  async checkIfCustomerExists(payload: CustomerRequest) {
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

    if (!isCustomerLinked) await user.related('customers').attach([customer.id])

    return customer
  }

  async updateCustomer() {}
}

export default new CustomerService()
