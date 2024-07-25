import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').nullable().onDelete('CASCADE')
      table
        .integer('customer_id')
        .unsigned()
        .references('customers.id')
        .nullable()
        .onDelete('CASCADE')
      table.integer('notation').notNullable().defaultTo(1)
      table.integer('nb_no_show').notNullable().defaultTo(0)
      table.integer('nb_orders_completed').notNullable().defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
