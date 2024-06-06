import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'you.moudni+user-1@gmail.com',
        compagny_name: 'Le Gourmet Français',
        siret_number: '12345678900012',
        password: '12345678',
        is_activated: true,
      },
      {
        email: 'you.moudni+user-2@gmail.com',
        compagny_name: 'Épicerie du Terroir',
        siret_number: '34567890100034',
        password: '12345678',
        is_activated: true,
      },
      {
        email: 'you.moudni+user-3@gmail.com',
        compagny_name: 'La Table des Saveurs',
        siret_number: '12345678987655',
        password: '12345678',
        is_activated: true,
      },
      {
        email: 'you.moudni+user-4@gmail.com',
        compagny_name: 'Bio et Local',
        siret_number: '45678901200045',
        password: '12345678',
        is_activated: true,
      },
    ])
  }
}
