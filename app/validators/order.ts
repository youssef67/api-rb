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
    pickupTime: vine.string(),
    detailsForCustomer: vine.string().minLength(0).maxLength(600),
    detailsForUser: vine.string().minLength(0).maxLength(600),
  })
)

export const updateOrderValidator = vine.compile(
  vine.object({
    orderId: vine.number().min(1),
    amount: vine.number().min(1),
    pickupDate: vine.string(),
    pickupTime: vine.string(),
    detailsForCustomer: vine.string().minLength(2).maxLength(600).nullable(),
    detailsForUser: vine.string().minLength(2).maxLength(600).nullable(),
  })
)

export const OrderIdValidator = vine.compile(
  vine.object({
    orderId: vine.number().min(1),
  })
)
