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
        orderPrice: 50,
        stateId: 1,
        pickupDate: this.convertDate('19/06/2024').isValid
          ? this.convertDate('19/06/2024').toSQLDate()
          : null,
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 79,
        stateId: 2,
        pickupDate: this.convertDate('10/10/2024').isValid
          ? this.convertDate('10/10/2024').toSQLDate()
          : null,
      },
      {
        userId: 1,
        customerId: 1,
        orderPrice: 30,
        stateId: 1,
        pickupDate: this.convertDate('08/10/2024').isValid
          ? this.convertDate('08/10/2024').toSQLDate()
          : null,
      },
      {
        userId: 1,
        customerId: 3,
        orderPrice: 20,
        stateId: 2,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 35,
        stateId: 1,
        pickupDate: this.convertDate('10/10/2024').isValid
          ? this.convertDate('10/10/2024').toSQLDate()
          : null,
      },
      {
        userId: 1,
        customerId: 4,
        orderPrice: 20,
        stateId: 3,
        pickupDate: this.convertDate('09/08/2024').isValid
          ? this.convertDate('09/08/2024').toSQLDate()
          : null,
      },
      //------- User 2 -------
      {
        userId: 2,
        customerId: 2,
        orderPrice: 100,
        stateId: 1,
        pickupDate: this.convertDate('01/09/2024').isValid
          ? this.convertDate('01/09/2024').toSQLDate()
          : null,
      },
      {
        userId: 2,
        customerId: 2,
        orderPrice: 200,
        stateId: 1,
        pickupDate: this.convertDate('01/09/2024').isValid
          ? this.convertDate('01/09/2024').toSQLDate()
          : null,
      },
      {
        userId: 2,
        customerId: 2,
        orderPrice: 150,
        stateId: 1,
        pickupDate: this.convertDate('20/08/2024').isValid
          ? this.convertDate('20/08/2024').toSQLDate()
          : null,
      },
      {
        userId: 2,
        customerId: 3,
        orderPrice: 70,
        stateId: 1,
        pickupDate: this.convertDate('15/08/2024').isValid
          ? this.convertDate('15/08/2024').toSQLDate()
          : null,
      },
      {
        userId: 2,
        customerId: 3,
        orderPrice: 90,
        stateId: 1,
        pickupDate: this.convertDate('14/06/2024').isValid
          ? this.convertDate('16/06/2024').toSQLDate()
          : null,
      },
    ])
  }

  convertDate(date: string): DateTime<boolean> {
    return DateTime.fromFormat(date, 'dd/MM/yyyy', { locale: 'fr' })
  }
}
