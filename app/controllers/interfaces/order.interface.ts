import { DateTime } from 'luxon'

export interface OrderRequest {
  userId: number
  name: string
  lastname: string
  email: string
  phone: string
  amount: number
  pickupDate: string
}

export interface OrderServiceRequest {
  userId: number
  name: string
  lastname: string
  email: string
  phone: string
  amount: number
  pickupDate: DateTime
}
