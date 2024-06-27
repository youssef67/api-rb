import { CustomerFactory } from '#database/factories/customer_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { OrderFactory } from '#database/factories/order_factory'
import States from '../../app/enums/states.js'

export default class extends BaseSeeder {
  static environment: ['development']

  async run() {
    const nbUsers: number = 4

    await UserFactory.createMany(nbUsers)
    const customersFactory = await CustomerFactory.createMany(50)

    const createCustomersWithUsers = async () => {
      // loop on all customers and attach random users to them
      for (const customer of customersFactory) {
        let numberOfUsers = Math.floor(Math.random() * 3) + 1
        let idOfUsers: number[] = []

        for (let index = 0; index < numberOfUsers; index++) {
          let id = Math.floor(Math.random() * nbUsers) + 1

          while (idOfUsers.includes(id)) {
            id = Math.floor(Math.random() * nbUsers) + 1
          }

          idOfUsers.push(id)
        }

        await customer.related('users').attach(idOfUsers)
      }
    }

    await createCustomersWithUsers()

    // Type to represent a value-weight pair
    type WeightedChoice<T> = [T, number]

    // function to choose pondereated value
    function weightedRandom<T>(choices: WeightedChoice<T>[]): T {
      let totalWeight = 0
      for (const [, weight] of choices) {
        totalWeight += weight
      }

      const random = Math.random() * totalWeight
      let cumulativeWeight = 0

      for (const [value, weight] of choices) {
        cumulativeWeight += weight
        if (random < cumulativeWeight) {
          return value
        }
      }

      // in case of error, return the first value
      return choices[0][0]
    }

    // define the weighted choices for the stateId field
    const weightedChoices: WeightedChoice<States>[] = [
      [States.CONFIRMED, 0.5], // 50% de probability
      [States.RECOVERED, 0.3], // 30% de probability
      [States.PENDING, 0.15], // 15% de probability
      [States.CANCELLED, 0.05], // 5% de probability
    ]

    // loop on all customers and attach order to them
    for (const customer of customersFactory) {
      let numberOfOrders = Math.floor(Math.random() * 10) + 1

      for (let index = 0; index < numberOfOrders; index++) {
        console.log(States.CONFIRMED)

        await OrderFactory.merge({
          stateId: weightedRandom(weightedChoices),
          customerId: customer.id,
          userId: Math.floor(Math.random() * nbUsers) + 1,
        }).create()
      }
    }
  }
}
