import { DateTime } from 'luxon'

export interface CustomerRequest {
  userId?: number
  name: string
  lastname: string
  email: string
  phone: string
}

export interface Customer {
  id: number
  name: string
  lastname: string
  phone: string
  email: string
  createdAt: DateTime
  updatedAt: DateTime
}

export interface ResponseAllCustomers {
  customer: Customer
  ordersCount: number
  lastOrderDate: string
  totalOrderAmount: string
}
