import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Customers extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE')
      table.integer('state_id').unsigned().references('states.id')
      table.decimal('order_price', 10, 2).notNullable()
      table.timestamp('pickup_date', { useTz: true }).notNullable()
      table.string('pickup_time').notNullable()
      table.string('details_for_customer')
      table.string('details_for_user')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
