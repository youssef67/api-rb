import { BaseSeeder } from '@adonisjs/lucid/seeders'
import State from '#models/state'
import States from '../../app/enums/states.ts'

export default class extends BaseSeeder {
  async run() {
    await State.createMany([
      {
        id: States.CONFIRMED,
        status: 'confirmed',
      },
      {
        id: States.PENDING,
        status: 'pending',
      },
      {
        id: States.RECOVERED,
        status: 'recovered',
      },
      {
        id: States.CANCELLED,
        status: 'cancelled',
      },
    ])
  }
}
