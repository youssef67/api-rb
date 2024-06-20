import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Order from '#models/order'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Order.createMany([
      //------- User 1 -------
      {
        userId: 1,
        customerId: 1,
        orderPrice: 1,
        stateId: 1,
        pickupDate: this.convertDate('19/06/2024').isValid
          ? this.convertDate('19/06/2024').toSQLDate()
          : null,
        pickupTime: '17:30:00',
        detailsForCustomer: 'Details for customer 1',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 2,
        stateId: 2,
        pickupDate: this.convertDate('10/10/2024').isValid
          ? this.convertDate('10/10/2024').toSQLDate()
          : null,
        pickupTime: '15:00:00',

        detailsForUser: 'Details for user 2',
      },
      {
        userId: 1,
        customerId: 1,
        orderPrice: 3,
        stateId: 1,
        pickupDate: this.convertDate('08/10/2024').isValid
          ? this.convertDate('08/10/2024').toSQLDate()
          : null,
        pickupTime: '19:00:00',
        detailsForUser: 'Details for user 3',
      },
      {
        userId: 1,
        customerId: 3,
        orderPrice: 4,
        stateId: 2,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
        pickupTime: '20:30:00',
        detailsForCustomer: 'Details for customer 4',
        detailsForUser: 'Details for user 4',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 5,
        stateId: 1,
        pickupTime: '21:00:00',
        pickupDate: this.convertDate('10/10/2024').isValid
          ? this.convertDate('10/10/2024').toSQLDate()
          : null,
        detailsForCustomer: 'Details for customer 5',
        detailsForUser: 'Details for user 5',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 6,
        stateId: 2,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
        pickupTime: '16:30:00',
        detailsForCustomer: 'Details for customer 6',
        detailsForUser: 'Details for user 6',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 7,
        stateId: 1,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
        pickupTime: '17:00:00',
        detailsForCustomer: 'Details for customer 7',
        detailsForUser: 'Details for user 7',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 8,
        stateId: 1,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
        pickupTime: '17:30:00',
        detailsForCustomer: 'Details for customer 8',
        detailsForUser: 'Details for user 8',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 9,
        stateId: 2,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
        pickupTime: '18:30:00',
        detailsForCustomer: 'Details for customer 9',
        detailsForUser: 'Details for user 9',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 10,
        stateId: 1,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
        pickupTime: '18:00:00',
        detailsForCustomer: 'Details for customer 10',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 11,
        stateId: 2,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
        pickupTime: '18:00:00',
        detailsForUser: 'Details for user 11',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 12,
        stateId: 2,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
        pickupTime: '11:30:00',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 13,
        stateId: 2,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
        pickupTime: '11:00:00',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 14,
        stateId: 1,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
        pickupTime: '10:00:00',

        detailsForCustomer: 'Details for customer 12',
        detailsForUser: 'Details for user 12',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 15,
        stateId: 1,
        pickupTime: '12:00:00',
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 16,
        stateId: 1,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
        pickupTime: '19:00:00',
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 17,
        stateId: 2,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
        pickupTime: '15:30:00',
        detailsForUser: 'Details for user 13',
      },
      //------- User 2 -------
      {
        userId: 2,
        customerId: 2,
        orderPrice: 1,
        stateId: 1,
        pickupDate: this.convertDate('01/09/2024').isValid
          ? this.convertDate('01/09/2024').toSQLDate()
          : null,
        pickupTime: '17:30:00',
      },
      {
        userId: 2,
        customerId: 2,
        orderPrice: 2,
        stateId: 1,
        pickupDate: this.convertDate('01/09/2024').isValid
          ? this.convertDate('01/09/2024').toSQLDate()
          : null,
        pickupTime: '18:00:00',
      },
      {
        userId: 2,
        customerId: 2,
        orderPrice: 3,
        stateId: 1,
        pickupDate: this.convertDate('20/08/2024').isValid
          ? this.convertDate('20/08/2024').toSQLDate()
          : null,
        pickupTime: '19:00:00',
      },
      {
        userId: 2,
        customerId: 3,
        orderPrice: 4,
        stateId: 1,
        pickupDate: this.convertDate('15/08/2024').isValid
          ? this.convertDate('15/08/2024').toSQLDate()
          : null,
        pickupTime: '17:30:00',
      },
      {
        userId: 2,
        customerId: 3,
        orderPrice: 5,
        stateId: 1,
        pickupDate: this.convertDate('14/06/2024').isValid
          ? this.convertDate('16/06/2024').toSQLDate()
          : null,
        pickupTime: '18:30:00',
      },
    ])
  }

  convertDate(date: string): DateTime<boolean> {
    return DateTime.fromFormat(date, 'dd/MM/yyyy', { locale: 'fr' })
  }
}
