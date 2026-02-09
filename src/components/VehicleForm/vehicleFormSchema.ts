import { z } from 'zod'

const currentYear = new Date().getFullYear()

export const vehicleCreateFormSchema = z.object({
  name: z.string().min(1, 'Введите название'),
  model: z.string().min(1, 'Введите модель'),
  year: z
    .number({ invalid_type_error: 'Введите год' })
    .int('Год должен быть целым числом')
    .min(1900, 'Год не может быть раньше 1900')
    .max(currentYear + 1, `Год не может быть позже ${currentYear + 1}`),
  color: z.string(),
  price: z.number({ invalid_type_error: 'Введите цену' }).min(0, 'Цена не может быть отрицательной'),
  latitude: z
    .number()
    .min(-90, 'Широта от -90 до 90')
    .max(90, 'Широта от -90 до 90')
    .optional(),
  longitude: z
    .number()
    .min(-180, 'Долгота от -180 до 180')
    .max(180, 'Долгота от -180 до 180')
    .optional(),
})

export type VehicleCreateFormValues = z.infer<typeof vehicleCreateFormSchema>
