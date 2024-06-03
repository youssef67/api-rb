import type { HttpContext } from '@adonisjs/core/http'

export default class OrdersController {
  async add({ request, response }: HttpContext) {
    console.log(request.body())
  }
}
