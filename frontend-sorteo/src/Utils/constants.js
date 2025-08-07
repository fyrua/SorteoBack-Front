export const TIPOS_DOCUMENTO = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'TI', label: 'Tarjeta de Identidad' },
  { value: 'PA', label: 'Pasaporte' },
]

export const ESTADOS_INSCRIPCION = {
  PENDIENTE: 'Pendiente',
  ACEPTADA: 'Aceptada',
  RECHAZADA: 'Rechazada'
}

export const ARCHIVOS_PERMITIDOS = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'application/pdf'
]

export const TAMAÑO_MAX_ARCHIVO = 5 * 1024 * 1024 // 5MB