import vine from '@vinejs/vine'

export const orderValidator = vine.compile(
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
