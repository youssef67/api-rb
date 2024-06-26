import { CustomerFactory } from '#database/factories/customer_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { OrderFactory } from '#database/factories/order_factory'
import Build from '@adonisjs/core/commands/build'

export default class extends BaseSeeder {
  static environment: ['development']

  async run() {
    // await UserFactory.with('customers', 15).createMany(10)

    await UserFactory.createMany(10)
    const customersFactory = await CustomerFactory.createMany(50)

    const createCustomersWithUsers = async () => {
      // loop on all customers and attach random users to them
      for (const customer of customersFactory) {
        let numberOfUsers = Math.floor(Math.random() * 3) + 1
        let idOfUsers: number[] = []

        for (let index = 0; index < numberOfUsers; index++) {
          let id = Math.floor(Math.random() * 10) + 1

          while (idOfUsers.includes(id)) {
            id = Math.floor(Math.random() * 10) + 1
          }

          idOfUsers.push(id)
        }

        await customer.related('users').attach(idOfUsers)
      }
    }

    await createCustomersWithUsers()

    // loop on all customers and attach order to them
    for (const customer of customersFactory) {
      let numberOfOrders = Math.floor(Math.random() * 10) + 1

      for (let index = 0; index < numberOfOrders; index++) {
        await OrderFactory.merge({
          customerId: customer.id,
          userId: Math.floor(Math.random() * 10) + 1,
        }).create()
      }
    }
  }
}
