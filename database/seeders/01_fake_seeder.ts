import { CustomerFactory } from '#database/factories/customer_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { OrderFactory } from '#database/factories/order_factory'
import States from '../../app/enums/states.js'
import { DateTime } from 'luxon'
import { faker } from '@faker-js/faker'

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

    // define the weighted choices for the stateId field for the futur orders
    const weightedChoiceFuturOrders: WeightedChoice<States>[] = [
      [States.CONFIRMED, 0.7], // 50% de probability
      [States.PENDING, 0.3], // 15% de probability
      [States.CANCELLED, 0.0], // 0% de probability
      [States.RECOVERED, 0.0], // 0% de probability
      [States.NOSWHOW, 0.0], // 0% de probability
    ]

    // define the weighted choices for the stateId field for the futur orders
    const weightedChoicesPastOrder: WeightedChoice<States>[] = [
      [States.RECOVERED, 0.75], // 30% de probability
      [States.CANCELLED, 0.15], // 15% de probability
      [States.NOSWHOW, 0.1], // 5% de probability
      [States.CONFIRMED, 0.0], // 0% de probability
      [States.PENDING, 0.0], // 0% de probability
    ]

    // loop on all customers and attach order in futur to them
    for (const customer of customersFactory) {
      let numberOfOrders = Math.floor(Math.random() * 10) + 1

      for (let index = 0; index < numberOfOrders; index++) {
        await OrderFactory.merge({
          pickupDate: DateTime.fromJSDate(
            faker.date.between({ from: '2024-07-23', to: '2024-07-31' })
          ),
          stateId: weightedRandom(weightedChoiceFuturOrders),
          customerId: customer.id,
          userId: Math.floor(Math.random() * nbUsers) + 1,
        }).create()
      }
    }

    // loop on all customers and attach order in past to them
    for (const customer of customersFactory) {
      let numberOfOrders = Math.floor(Math.random() * 10) + 1
      let nbOfNoShowOrder = 0

      for (let index = 0; index < numberOfOrders; index++) {
        let stateChoosen = weightedRandom(weightedChoicesPastOrder)

        await OrderFactory.merge({
          pickupDate: DateTime.fromJSDate(
            faker.date.between({ from: '2024-04-01', to: '2024-07-22' })
          ),
          stateId: stateChoosen,
          customerId: customer.id,
          userId: Math.floor(Math.random() * nbUsers) + 1,
        }).create()

        if (stateChoosen === 4) nbOfNoShowOrder++
      }

      const ratio = Number.parseInt(((nbOfNoShowOrder * 100) / numberOfOrders).toFixed(0))

      const notation = () => {
        if (ratio === 0) return 1
        else if (ratio > 0 && ratio <= 10) return 2
        else return 3
      }

      customer.notation = notation()
      customer.save()
    }
  }
}
