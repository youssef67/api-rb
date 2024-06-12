import { BaseSeeder } from '@adonisjs/lucid/seeders'
import State from '#models/state'

export default class extends BaseSeeder {
  async run() {
    await State.createMany([
      {
        status: 'confirmed',
      },
      {
        status: 'pending',
      },
      {
        status: 'recovered',
      },
      {
        status: 'cancelled',
      },
    ])
  }
}
