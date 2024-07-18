import mail from '@adonisjs/mail/services/main'

export default class EmailOrder {
  static async sendEmailForOrder(
    email: string,
    amount: number,
    pickupDate: string,
    details: string,
    token: string,
    orderId: number,
    urlBase?: string
  ) {
    const confirmationUrl = `${urlBase}/confirmation?token=${token}&id=${encodeURIComponent(orderId)}`

    mail.send((message) => {
      message
        .from('contact@rabbit_butcher.com')
        .to(email)
        .subject('Confirmation de commande')
        .htmlView('emails/confirmation_order', {
          amount,
          pickupDate,
          details,
          confirmationUrl,
        })
    })
  }

  static async sendEmailForUpdate(
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
        .htmlView('emails/update_order', { email, amount, pickupDate, details })
    })
  }
}
