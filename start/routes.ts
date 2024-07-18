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
const CustomersController = () => import('#controllers/customers/customers_controller')

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
            router.post('update', [OrdersController, 'update'])
            router.post('updateStatus', [OrdersController, 'updateStatus'])
            router.get('day-orders', [OrdersController, 'getDayOrders'])
            router.get('all-orders', [OrdersController, 'getAllOrders'])
            router.get('orders-history', [OrdersController, 'getHistoryOrders'])
          })
          .use(middleware.auth())
          .prefix('order')

        router.post('confirmation', [OrdersController, 'orderConfirmation']).prefix('order')
        router
          .group(() => {
            router.get('all-customers', [CustomersController, 'getAllCustomers'])
            router.post('update', [CustomersController, 'update'])
          })
          .use(middleware.auth())
          .prefix('customer')
      })
      .prefix('v1')
  })
  .prefix('/api/')
