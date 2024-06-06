import env from '#start/env'
import User from '#models/user'
import type { RegisterRequest } from '#controllers/interfaces/register.interface'
import { ActivationService } from '#services/activation/activation_service'
import { HttpContext } from '@adonisjs/core/http'

class AuthService {
  async register(payload: RegisterRequest) {
    const user = await User.create(payload)

    ActivationService.sendActivationEmail(user, env.get('BASE_URL'))
    return user
  }

  async login(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)

    if (!user.is_activated) throw new Error('User is not activated')

    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: env.get('JWT_EXPIRY'),
    })

    return { token, user }
  }

  async logout(): Promise<boolean> {
    const ctx = HttpContext.getOrFail()

    await ctx.auth.authenticate()

    const user = ctx.auth.getUserOrFail()
    const token = user?.currentAccessToken.identifier

    if (!token) {
      return false
    }

    await User.accessTokens.delete(user, token)

    return true
  }
}

export default new AuthService()
