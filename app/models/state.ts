import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Order from './order.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class State extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>
}
