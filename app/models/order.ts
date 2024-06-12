import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import State from './state.js'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderPrice: number

  @column()
  declare pickupDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare customerId: number

  @column()
  declare userId: number

  @column()
  declare stateId: number

  @belongsTo(() => State)
  declare status: BelongsTo<typeof State>

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
