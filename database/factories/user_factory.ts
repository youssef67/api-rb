import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { CustomerFactory } from './customer_factory.ts'

const defaultPassword = 'kurosaki'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      email: `you.moudni+user-${faker.internet.userName()}@gmail.com`,
      compagny_name: faker.company.name(),
      siret_number: faker.finance.accountNumber(14),
      password: defaultPassword,
      is_activated: true,
    }
  })
  .relation('customers', () => CustomerFactory)
  .build()
