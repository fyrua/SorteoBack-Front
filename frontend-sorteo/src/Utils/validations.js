export const validations = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'Este campo es obligatorio'
    }
    return true
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Ingresa un email válido'
    }
    return true
  },

  phone: (value) => {
    const phoneRegex = /^[0-9]{7,10}$/
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Ingresa un teléfono válido (7-10 dígitos)'
    }
    return true
  },

  document: (value, tipo) => {
    const cleanValue = value.replace(/\D/g, '')
    
    switch (tipo) {
      case 'CC':
        if (cleanValue.length < 6 || cleanValue.length > 10) {
          return 'La cédula debe tener entre 6 y 10 dígitos'
        }
        break
      case 'CE':
        if (cleanValue.length < 6 || cleanValue.length > 12) {
          return 'La cédula de extranjería debe tener entre 6 y 12 dígitos'
        }
        break
      default:
        if (cleanValue.length < 4) {
          return 'Documento muy corto'
        }
    }
    return true
  },

  age: (fechaNacimiento) => {
    const today = new Date()
    const birthDate = new Date(fechaNacimiento)
    const age = today.getFullYear() - birthDate.getFullYear()
    
    if (age < 18) {
      return 'Debes ser mayor de edad (18 años)'
    }
    
    if (age > 100) {
      return 'Fecha de nacimiento inválida'
    }
    
    return true
  },

  file: (file) => {
    if (!file) {
      return 'Debes adjuntar un archivo'
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return 'Solo se permiten archivos JPG, PNG o PDF'
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return 'El archivo no puede superar 5MB'
    }

    return true
  }
}