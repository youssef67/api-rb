import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import State from './state.js'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderPrice: number

  @column.dateTime()
  declare pickupDate: DateTime

  @column()
  declare pickupTime: string

  @column()
  declare detailsForCustomer: String

  @column()
  declare detailsForUser: String

  @column()
  declare stateId: number

  @column()
  declare customerId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => State)
  declare status: BelongsTo<typeof State>

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
