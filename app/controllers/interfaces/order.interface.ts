import { DateTime } from 'luxon'

export interface OrderRequest {
  amount: number
  pickupDate: DateTime
}
