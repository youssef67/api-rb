import Customer from '#models/customer'
import User from '#models/user'
import { CustomerRequest } from '#controllers/interfaces/customer.interface'

class CustomerService {
  async checkIfCustomerExists(payload: CustomerRequest) {
    const { userId, ...columnsCustomer } = payload

    const user = await User.findOrFail(userId)

    let customer = await Customer.findBy('email', columnsCustomer.email)

    if (!customer) {
      customer = new Customer()
      customer.email = columnsCustomer.email
      customer.phone = columnsCustomer.phone
      customer.name = columnsCustomer.name
      customer.lastname = columnsCustomer.lastname
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
}

export default new CustomerService()
