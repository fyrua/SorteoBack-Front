import { useState, useEffect } from 'react'
import { inscripcionService } from '../../services/inscripcionService'
import toast from 'react-hot-toast'

export const useInscripciones = () => {
  const [inscripciones, setInscripciones] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const cargarInscripciones = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await inscripcionService.obtenerInscripciones()
      setInscripciones(data)
    } catch (err) {
      setError(err.message)
      toast.error('Error al cargar inscripciones')
    } finally {
      setLoading(false)
    }
  }

  const actualizarEstado = async (id, estado, motivo = '') => {
    try {
      await inscripcionService.actualizarEstado(id, estado, motivo)
      
      // Actualizar estado local
      setInscripciones(prev => 
        prev.map(ins => 
          ins.id === id ? { ...ins, estado, fechaActualizacion: new Date() } : ins
        )
      )
      
      toast.success(`Inscripción ${estado.toLowerCase()} exitosamente`)
    } catch (err) {
      toast.error('Error al actualizar estado')
      throw err
    }
  }

  const crearInscripcion = async (formData) => {
    try {
      setLoading(true)
      const nuevaInscripcion = await inscripcionService.crearInscripcion(formData)
      setInscripciones(prev => [nuevaInscripcion, ...prev])
      toast.success('Inscripción creada exitosamente')
      return nuevaInscripcion
    } catch (err) {
      setError(err.message)
      toast.error('Error al crear inscripción')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarInscripciones()
  }, [])

  return {
    inscripciones,
    loading,
    error,
    cargarInscripciones,
    actualizarEstado,
    crearInscripcion
  }
}