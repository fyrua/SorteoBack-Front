import { useState, useEffect } from 'react'
import { inscripcionService } from '../services/inscripcionService'
import ListaInscripciones from '../components/admin/ListaInscripciones'
import DetalleInscripcion from '../components/admin/DetalleInscripcion'
import AdminLayout from '../components/admin/AdminLayout'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { Users, CheckCircle, XCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const [inscripciones, setInscripciones] = useState([])
  const [inscripcionSeleccionada, setInscripcionSeleccionada] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    cargarInscripciones()
  }, [])

  const cargarInscripciones = async () => {
    try {
      setIsLoading(true)
      const data = await inscripcionService.obtenerInscripciones()
      setInscripciones(data)
    } catch (error) {
      toast.error('Error al cargar las inscripciones')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSeleccionarInscripcion = (inscripcion) => {
    setInscripcionSeleccionada(inscripcion)
  }

  const handleActualizarEstado = async (id, nuevoEstado, motivo) => {
    try {
      await inscripcionService.actualizarEstado(id, nuevoEstado, motivo)
      
      // Actualizar la lista local
      setInscripciones(prevInscripciones =>
        prevInscripciones.map(ins =>
          ins.id === id ? { ...ins, estado: nuevoEstado } : ins
        )
      )

      // Actualizar inscripción seleccionada si es la misma
      if (inscripcionSeleccionada?.id === id) {
        setInscripcionSeleccionada({ ...inscripcionSeleccionada, estado: nuevoEstado })
      }

      toast.success(`Inscripción ${nuevoEstado.toLowerCase()} correctamente`)
    } catch (error) {
      toast.error('Error al actualizar el estado')
    }
  }

  const inscripcionesFiltradas = inscripciones.filter(ins => {
    if (filtro === 'todos') return true
    return ins.estado.toLowerCase() === filtro
  })

  const estadisticas = {
    total: inscripciones.length,
    pendientes: inscripciones.filter(ins => ins.estado === 'Pendiente').length,
    aceptadas: inscripciones.filter(ins => ins.estado === 'Aceptada').length,
    rechazadas: inscripciones.filter(ins => ins.estado === 'Rechazada').length,
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" text="Cargando inscripciones..." />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header y Estadísticas */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Dashboard de Administración
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">{estadisticas.pendientes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Aceptadas</p>
                  <p className="text-2xl font-bold text-green-600">{estadisticas.aceptadas}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rechazadas</p>
                  <p className="text-2xl font-bold text-red-600">{estadisticas.rechazadas}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Inscripciones */}
          <div className="lg:col-span-2">
            <ListaInscripciones
              inscripciones={inscripcionesFiltradas}
              onSeleccionar={handleSeleccionarInscripcion}
              inscripcionSeleccionada={inscripcionSeleccionada}
              filtro={filtro}
              onFiltroChange={setFiltro}
            />
          </div>

          {/* Detalle */}
          <div>
            <DetalleInscripcion
              inscripcion={inscripcionSeleccionada}
              onActualizarEstado={handleActualizarEstado}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard