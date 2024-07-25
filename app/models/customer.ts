import { DateTime } from 'luxon'
import Order from './order.js'
import User from './user.js'
import Notation from './notation.js'

import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Customer extends BaseModel {
  serializeExtras = true

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare lastname: string

  @column()
  declare phone: string

  @column()
  declare email: string

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>

  @hasMany(() => Notation)
  declare notations: HasMany<typeof Notation>

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
