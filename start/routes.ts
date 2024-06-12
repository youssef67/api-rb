/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth/auth_controller')
const ActivationController = () => import('#controllers/activation/activations_controller')
const PasswordResetsController = () =>
  import('#controllers/password_reset/password_resets_controller')
const OrdersController = () => import('#controllers/orders/orders_controller')

router
  .group(() => {
    router
      .group(() => {
        router
          .group(() => {
            router.post('register', [AuthController, 'register'])
            router.post('login', [AuthController, 'login'])
            router.post('logout', [AuthController, 'logout']).use(middleware.auth())
          })
          .prefix('auth')

        router
          .group(() => {
            router.post('activate', [ActivationController, 'activate'])
            router.post('forgot-password', [PasswordResetsController, 'forgot'])
            router.post('reset-password', [PasswordResetsController, 'reset'])
          })
          .prefix('user')

        router
          .group(() => {
            router.post('add', [OrdersController, 'add'])
            router.post('recovered', [OrdersController, 'recoveredOrder'])
            router.post('canceled', [OrdersController, 'canceledOrder'])
            router.get('day-orders', [OrdersController, 'getDayOrders'])
          })
          .use(middleware.auth())
          .prefix('order')
      })
      .prefix('v1')
  })
  .prefix('/api/')
