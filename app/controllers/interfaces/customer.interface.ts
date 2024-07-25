import { DateTime } from 'luxon'

export interface CustomerRequest {
  userId?: number
  name: string
  lastname: string
  email: string
  phone: string
}

export interface NotationRequest {
  str: string
  userId: number
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
  ordersCount: number | undefined
  lastOrderDate: string
  totalOrderAmount: number | undefined
  nbOfNoShowOrder: number | undefined
  notation: number | undefined
}

export interface UpdateRequest {
  customerId: number
  name: string
  lastname: string
  phone: string
  email: string
}
