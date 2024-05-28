import type { HttpContext } from '@adonisjs/core/http'
import { forgotPasswordValidator, resetPasswordValidator } from '#validators/auth'
import { PasswordResetService } from '#services/password_reset/password_reset_service'
import env from '#start/env'

export default class PasswordResetsController {
  async forgot({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(forgotPasswordValidator)
      const email = payload.email

      await PasswordResetService.requestPasswordReset(email, env.get('BASE_URL') as string)

      return response.ok({ messages: 'Password reset email sent' })
    } catch (error) {
      return response.badRequest({ message: 'Cannot send password reset email' })
    }
  }

  async reset({ request, response }: HttpContext) {
    await request.validateUsing(resetPasswordValidator)
    const { token, newPassword } = request.all()

    const resetSuccessful = await PasswordResetService.resetPassword(token, newPassword)

    if (!resetSuccessful) {
      return response.badRequest({ message: 'Invalid or expire token' })
    }

    return response.ok({ message: 'Password reset successful' })
  }
}
