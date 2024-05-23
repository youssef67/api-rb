import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { messages } from '@vinejs/vine/defaults'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    console.log(email)
    console.log(password)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  async register({ request, response }: HttpContext) {
    console.log(request.input('email'))
    const payload = await registerValidator.validate({
      email: request.input('email'),
      compagny_name: request.input('compagny_name'),
      siret_number: request.input('siret_number'),
      password: request.input('password'),
      password_confirmation: request.input('confirm_password'),
    })

    const user = await User.create(payload)

    return response.created(user)
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    await User.accessTokens.delete(user, token)
    return response.ok({ messages: 'Log out' })
  }

  async orderValidation({ request, response, auth }: HttpContext) {
    console.log('toot')
    const user = auth.getUserOrFail()
  }
}
