import { DateTime } from 'luxon'

export interface OrderRequest {
  userId: number
  name: string
  lastname: string
  email: string
  phone: string
  amount: number
  pickupDate: string
  pickupTime: string
  detailsForCustomer: string
  detailsForUser: string
}

export interface UpdateRequest {
  orderId: number
  amount: number
  pickupDate: string
  pickupTime: string
  detailsForCustomer: string | null
  detailsForUser: string | null
}

export interface OrderServiceRequest {
  userId: number
  name: string
  lastname: string
  email: string
  phone: string
  amount: number
  pickupDate: DateTime
  detailsForCustomer: string
  detailsForUser: string
}

export interface ColumnsCustomer {
  userId: number
  name: string
  lastname: string
  email: string
  phone: string
  detailsForCustomer: string
  detailsForUser: string
}
