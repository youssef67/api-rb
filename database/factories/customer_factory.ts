import factory from '@adonisjs/lucid/factories'
import Customer from '#models/customer'
import { UserFactory } from './user_factory.js'

export const CustomerFactory = factory
  .define(Customer, async ({ faker }) => {
    return {
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      phone: faker.helpers.fromRegExp(/^0[1-9] (\d{2} ){4}$/),
      email: `you.moudni+customer-${faker.internet.userName()}@gmail.com`,
    }
  })
  .relation('users', () => UserFactory)
  .build()
