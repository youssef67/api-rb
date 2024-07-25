import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Customer from './customer.js'
import Order from './order.js'
import Notation from './notation.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  serializeExtras = true

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare compagny_name: string

  @column()
  declare siret_number: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare is_activated: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>

  @hasMany(() => Notation)
  declare notations: HasMany<typeof Notation>

  @manyToMany(() => Customer)
  declare customers: ManyToMany<typeof Customer>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
