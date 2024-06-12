import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Customer from '#models/customer'

export default class extends BaseSeeder {
  async run() {
    await Customer.createMany([
      {
        email: 'you.moudni+client1@gmail.com',
        name: 'Dupont',
        lastname: 'Julien',
        phone: '0612345678',
      },
      {
        email: 'you.moudni+client2@gmail.com',
        name: 'Martin',
        lastname: 'Sophie',
        phone: '0698765432',
      },
      {
        email: 'you.moudni+client3@gmail.com',
        name: 'Lefevre',
        lastname: 'Mathieu',
        phone: '0722334455',
      },
      {
        email: 'you.moudni+client4@gmail.com',
        name: 'Bernard',
        lastname: 'Claire',
        phone: '0687654321',
      },
      {
        email: 'you.moudni+client5@gmail.com',
        name: 'Gerard',
        lastname: 'Roger',
        phone: '0687654098',
      },
    ])
  }
}
