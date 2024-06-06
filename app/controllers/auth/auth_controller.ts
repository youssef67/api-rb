import { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'
import type {
  RegisterRequest,
  RegisterResponseBody,
} from '#controllers/interfaces/register.interface'
import AuthService from '#services/auth/auth_service'

export default class AuthController {
  async register({ request, response }: HttpContext): Promise<void> {
    try {
      const payload: RegisterRequest = await request.validateUsing(registerValidator)
      const user: RegisterResponseBody = await AuthService.register(payload)
      return response.status(201).json(user)
    } catch (error) {
      return response.badRequest({ message: 'Cannot register user' })
    }
  }

  //jodevog698@fresec.com
  async login({ request, response }: HttpContext): Promise<void> {
    try {
      const { email, password } = await request.validateUsing(loginValidator)

      const { token, user } = await AuthService.login(email, password)

      return response.ok({
        token: token,
        ...user.serialize(),
      })
    } catch (error) {
      return response.badRequest({ message: 'Cannot login user' })
    }
  }

  async logout({ response }: HttpContext) {
    const requestLogOut = await AuthService.logout()

    if (!requestLogOut) {
      return response.badRequest({ message: 'Cannot logout, Token or User not found' })
    }

    return response.ok({ messages: 'Log out successful' })
  }
}
