import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Customer from '#models/customer'

export default class extends BaseSeeder {
  async run() {
    await Customer.createMany([
      {
        email: 'you.moudni+client1@gmail.com',
        name: 'Jean',
        lastname: 'Dupont',
        phone: '0687654001',
      },
      {
        email: 'you.moudni+client2@gmail.com',
        name: 'Marie',
        lastname: 'Curie',
        phone: '0687654002',
      },
      {
        email: 'you.moudni+client3@gmail.com',
        name: 'Paul',
        lastname: 'Martin',
        phone: '0687654003',
      },
      {
        email: 'you.moudni+client4@gmail.com',
        name: 'Sophie',
        lastname: 'Bernard',
        phone: '0687654004',
      },
      {
        email: 'you.moudni+client5@gmail.com',
        name: 'Jacques',
        lastname: 'Durand',
        phone: '0687654005',
      },
      {
        email: 'you.moudni+client6@gmail.com',
        name: 'Claire',
        lastname: 'Leroy',
        phone: '0687654006',
      },
      {
        email: 'you.moudni+client7@gmail.com',
        name: 'Pierre',
        lastname: 'Moreau',
        phone: '0687654007',
      },
      {
        email: 'you.moudni+client8@gmail.com',
        name: 'Elise',
        lastname: 'Simon',
        phone: '0687654008',
      },
      {
        email: 'you.moudni+client9@gmail.com',
        name: 'Louis',
        lastname: 'Laurent',
        phone: '0687654009',
      },
      {
        email: 'you.moudni+client10@gmail.com',
        name: 'Anne',
        lastname: 'Meyer',
        phone: '0687654010',
      },
      {
        email: 'you.moudni+client11@gmail.com',
        name: 'Luc',
        lastname: 'Blanc',
        phone: '0687654011',
      },
      {
        email: 'you.moudni+client12@gmail.com',
        name: 'Julie',
        lastname: 'Garnier',
        phone: '0687654012',
      },
      {
        email: 'you.moudni+client13@gmail.com',
        name: 'Hugo',
        lastname: 'Rousseau',
        phone: '0687654013',
      },
      {
        email: 'you.moudni+client14@gmail.com',
        name: 'Laura',
        lastname: 'Fontaine',
        phone: '0687654014',
      },
      {
        email: 'you.moudni+client15@gmail.com',
        name: 'Thomas',
        lastname: 'Chevalier',
        phone: '0687654015',
      },
      {
        email: 'you.moudni+client16@gmail.com',
        name: 'Emma',
        lastname: 'Lemoine',
        phone: '0687654016',
      },
      {
        email: 'you.moudni+client17@gmail.com',
        name: 'Antoine',
        lastname: 'Leclerc',
        phone: '0687654017',
      },
      {
        email: 'you.moudni+client18@gmail.com',
        name: 'Eva',
        lastname: 'Lefevre',
        phone: '0687654018',
      },
      {
        email: 'you.moudni+client19@gmail.com',
        name: 'Marc',
        lastname: 'Dupuis',
        phone: '0687654019',
      },
      {
        email: 'you.moudni+client20@gmail.com',
        name: 'Léa',
        lastname: 'Perrin',
        phone: '0687654020',
      },
      {
        email: 'you.moudni+client20@gmail.com',
        name: 'Youssef',
        lastname: 'Mouloud',
        phone: '0687654020',
      },
      {
        email: 'you.moudni+client20@gmail.com',
        name: 'Najia',
        lastname: 'Haddidou',
        phone: '0687698420',
      },
    ])
  }
}
