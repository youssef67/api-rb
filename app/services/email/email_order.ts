import mail from '@adonisjs/mail/services/main'

export default class EmailOrder {
  static async sendEmailForOrder(
    email: string,
    amount: number,
    pickupDate: string,
    details: string
  ) {
    await mail.send((message) => {
      message
        .from('contact@rabbit_butcher.com')
        .to(email)
        .subject('Confirmation de commande')
        .htmlView('emails/confirmation_order', { email, amount, pickupDate, details })
    })
  }
}
