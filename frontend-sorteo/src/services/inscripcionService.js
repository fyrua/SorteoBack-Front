import api from './api'

export const inscripcionService = {
  async crearInscripcion(formData) {
    try {
      const response = await api.post('/inscripciones', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear inscripción')
    }
  },

  async obtenerInscripciones() {
    try {
      const response = await api.get('/admin/inscripciones')
      return response.data
    } catch (error) {
      throw new Error('Error al obtener inscripciones')
    }
  },

  async obtenerInscripcion(id) {
    try {
      const response = await api.get(`/admin/inscripciones/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Error al obtener inscripción')
    }
  },

  async actualizarEstado(id, estado, motivo = '') {
    try {
      const response = await api.put(`/inscripciones/${id}/estado`, {
        estado,
        motivo
      })
      return response.data
    } catch (error) {
      throw new Error('Error al actualizar estado')
    }
  }
}