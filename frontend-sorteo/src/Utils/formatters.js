import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const formatters = {
  // Formatear fecha
  fecha: (fecha, formato = 'dd/MM/yyyy') => {
    try {
      return format(new Date(fecha), formato, { locale: es })
    } catch {
      return 'Fecha inválida'
    }
  },

  // Formatear fecha y hora
  fechaHora: (fecha) => {
    try {
      return format(new Date(fecha), 'dd/MM/yyyy HH:mm', { locale: es })
    } catch {
      return 'Fecha inválida'
    }
  },

  // Formatear fecha en palabras
  fechaPalabras: (fecha) => {
    try {
      return format(new Date(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es })
    } catch {
      return 'Fecha inválida'
    }
  },

  // Formatear teléfono
  telefono: (numero) => {
    const cleaned = numero.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
    }
    return numero
  },

  // Formatear documento
  documento: (numero, tipo) => {
    const cleaned = numero.replace(/\D/g, '')
    if (tipo === 'CC' && cleaned.length >= 6) {
      return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
    return numero
  },

  // Capitalizar primera letra
  capitalizar: (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
  },

  // Formatear nombre completo
  nombreCompleto: (nombres, apellidos) => {
    const formatearParte = (parte) => 
      parte.split(' ')
        .map(palabra => formatters.capitalizar(palabra))
        .join(' ')
    
    return `${formatearParte(nombres)} ${formatearParte(apellidos)}`
  },

  // Calcular edad
  calcularEdad: (fechaNacimiento) => {
    try {
      const hoy = new Date()
      const nacimiento = new Date(fechaNacimiento)
      let edad = hoy.getFullYear() - nacimiento.getFullYear()
      const mesActual = hoy.getMonth()
      const mesNacimiento = nacimiento.getMonth()
      
      if (mesActual < mesNacimiento || 
          (mesActual === mesNacimiento && hoy.getDate() < nacimiento.getDate())) {
        edad--
      }
      
      return edad
    } catch {
      return null
    }
  },

  // Formatear tamaño de archivo
  tamanoArchivo: (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }
}