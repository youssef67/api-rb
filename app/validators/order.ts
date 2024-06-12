import vine from '@vinejs/vine'

export const addOrderValidator = vine.compile(
  vine.object({
    userId: vine.number().min(1),
    name: vine.string().minLength(2).maxLength(255),
    lastname: vine.string().minLength(2).maxLength(255),
    email: vine.string().email(),
    phone: vine.string().minLength(10).maxLength(15),
    amount: vine.number().min(1),
    pickupDate: vine.string(),
  })
)

export const OrderIdValidator = vine.compile(
  vine.object({
    orderId: vine.number().min(1),
  })
)
