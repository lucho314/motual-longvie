// src/schemas/socioSchema.ts
import * as yup from 'yup'

export const socioSchema = yup.object({
  legajo: yup
    .number()
    .typeError('El legajo debe ser un número')
    .required('El legajo es obligatorio'),
  nombre: yup.string().required('El nombre es obligatorio'),
  correo: yup
    .string()
    .email('Correo inválido')
    .required('El correo es obligatorio')
})
