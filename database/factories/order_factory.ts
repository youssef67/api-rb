import factory from '@adonisjs/lucid/factories'
import Order from '#models/order'
import { DateTime } from 'luxon'
import { CustomerFactory } from './customer_factory.js'
import { UserFactory } from './user_factory.js'

export const OrderFactory = factory
  .define(Order, async ({ faker }) => {
    return {
      orderPrice: faker.number.float({ min: 10, max: 200 }),
      pickupDate: DateTime.fromJSDate(faker.date.between({ from: '2024-06-26', to: '2024-07-31' })),
      pickupTime: faker.helpers.arrayElement([
        '12:00:00',
        '12:30:00',
        '13:00:00',
        '13:30:00',
        '14:00:00',
        '14:30:00',
        '15:00:00',
        '15:30:00',
        '16:00:00',
        '16:30:00',
        '17:00:00',
        '18:00:00',
        '18:30:00',
        '19:00:00',
        '19:30:00',
        '20:00:00',
        '20:30:00',
        '21:00:00',
        '21:30:00',
        '22:00:00',
        '22:30:00',
        '23:00:00',
        '23:30:00',
      ]),
      detailsForCustomer: faker.lorem.sentence(),
      detailsForUser: faker.lorem.sentence(),
    }
  })
  .relation('customer', () => CustomerFactory)
  .relation('user', () => UserFactory)
  .build()
