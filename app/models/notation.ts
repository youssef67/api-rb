import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import User from './user.js'

import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Notation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare notation: number

  @column()
  declare nbOrdersCompleted: number

  @column()
  declare nbNoShow: number

  @column()
  declare customerId: number

  @column()
  declare userId: number

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
