import factory from '@adonisjs/lucid/factories'
import Notation from '#models/notation'
import { CustomerFactory } from './customer_factory.js'
import { UserFactory } from './user_factory.js'

export const NotationFactory = factory
  .define(Notation, async ({ faker }) => {
    return {
      notation: faker.number.int(),
      nbNoShow: faker.number.int(),
      nbOrdersCompleted: faker.number.int(),
    }
  })
  .relation('customer', () => CustomerFactory)
  .relation('user', () => UserFactory)
  .build()
