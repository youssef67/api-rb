import { DateTime } from 'luxon'
export interface RegisterRequest {
  email: string
  compagny_name: string
  siret_number: string
  password: string
}

export interface RegisterResponseBody {
  email: string
  createdAt: DateTime | null
  updatedAt: DateTime | null
  id: number
}
