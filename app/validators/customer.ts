import vine from '@vinejs/vine'

export const updateCustomerValidator = vine.compile(
  vine.object({
    customerId: vine.number().min(1),
    email: vine.string().email(),
    name: vine.string().minLength(2).maxLength(255),
    lastname: vine.string().minLength(2).maxLength(255),
    phone: vine.string().minLength(10).maxLength(15),
  })
)

export const NotationValidator = vine.compile(
  vine.object({
    str: vine.string().minLength(1).maxLength(255),
    userId: vine.number().min(1),
  })
)
