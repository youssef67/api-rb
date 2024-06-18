import { DateTime } from 'luxon'

export interface OrderRequest {
  userId: number
  name: string
  lastname: string
  email: string
  phone: string
  amount: number
  pickupDate: string
  detailsForCustomer: string
  detailsForUser: string
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
