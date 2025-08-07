import { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  CheckCircle, 
  XCircle,
  Download,
  Eye
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Modal from '../common/Modal'
import LoadingSpinner from '../common/LoadingSpinner'
import toast from 'react-hot-toast'

const DetalleInscripcion = ({ inscripcion, onActualizarEstado }) => {
  const [mostrarModal, setMostrarModal] = useState(false)
  const [accionSeleccionada, setAccionSeleccionada] = useState('')
  const [motivo, setMotivo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mostrarArchivo, setMostrarArchivo] = useState(false)

  if (!inscripcion) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center text-gray-500">
          <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Selecciona una inscripción para ver los detalles</p>
        </div>
      </div>
    )
  }

  const formatearFecha = (fecha) => {
    try {
      return format(new Date(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es })
    } catch {
      return 'Fecha inválida'
    }
  }

  const calcularEdad = (fechaNacimiento) => {
    try {
      const hoy = new Date()
      const nacimiento = new Date(fechaNacimiento)
      let edad = hoy.getFullYear() - nacimiento.getFullYear()
      const mesActual = hoy.getMonth()
      const mesNacimiento = nacimiento.getMonth()
      
      if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < nacimiento.getDate())) {
        edad--
      }
      
      return edad
    } catch {
      return 'N/A'
    }
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Aceptada':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Rechazada':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleAccion = (accion) => {
    setAccionSeleccionada(accion)
    setMostrarModal(true)
    setMotivo('')
  }

  const confirmarAccion = async () => {
    if (!accionSeleccionada) return

    setIsLoading(true)
    try {
      await onActualizarEstado(inscripcion.id, accionSeleccionada, motivo)
      setMostrarModal(false)
      setMotivo('')
    } catch (error) {
      toast.error('Error al actualizar el estado')
    } finally {
      setIsLoading(false)
    }
  }

  const descargarArchivo = () => {
    // Implementar descarga del archivo
    if (inscripcion.rutaArchivo) {
      const link = document.createElement('a')
      link.href = inscripcion.rutaArchivo
      link.download = `documento_${inscripcion.numeroDocumento}`
      link.click()
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Detalle de Inscripción
              </h3>
              <p className="text-sm text-gray-600">ID: #{inscripcion.id}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(inscripcion.estado)}`}>
              {inscripcion.estado}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Información Personal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Información Personal
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Nombre Completo
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {inscripcion.nombres} {inscripcion.apellidos}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Tipo de Documento
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{inscripcion.tipoDocumento}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Número de Documento
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{inscripcion.numeroDocumento}</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Fecha de Nacimiento
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {formatearFecha(inscripcion.fechaNacimiento)} ({calcularEdad(inscripcion.fechaNacimiento)} años)
                </p>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Información de Contacto
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">{inscripcion.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">{inscripcion.telefono}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-sm text-gray-900">{inscripcion.direccion}</span>
              </div>
            </div>
          </div>

          {/* Documento */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Documento Adjunto
            </h4>
            {inscripcion.rutaArchivo ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setMostrarArchivo(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Documento</span>
                </button>
                <button
                  onClick={descargarArchivo}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar</span>
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No hay documento adjunto</p>
            )}
          </div>

          {/* Fechas */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Fechas Importantes
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha de inscripción:</span>
                <span className="text-gray-900">
                  {format(new Date(inscripcion.fechaInscripcion), 'dd/MM/yyyy HH:mm')}
                </span>
              </div>
              {inscripcion.fechaActualizacion && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Última actualización:</span>
                  <span className="text-gray-900">
                    {format(new Date(inscripcion.fechaActualizacion), 'dd/MM/yyyy HH:mm')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {inscripcion.estado === 'Pendiente' && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex space-x-3">
              <button
                onClick={() => handleAccion('Aceptada')}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Aceptar
              </button>
              <button
                onClick={() => handleAccion('Rechazada')}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Rechazar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Confirmación */}
      <Modal
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        title={`${accionSeleccionada === 'Aceptada' ? 'Aceptar' : 'Rechazar'} Inscripción`}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            ¿Estás seguro de que deseas {accionSeleccionada === 'Aceptada' ? 'aceptar' : 'rechazar'} 
            esta inscripción? Se enviará una notificación al usuario.
          </p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo (opcional):
            </label>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Ingresa un motivo o comentario..."
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={confirmarAccion}
              disabled={isLoading}
              className={`flex-1 px-4 py-2 text-white text-sm font-medium rounded-md transition-colors ${
                accionSeleccionada === 'Aceptada'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              } disabled:opacity-50`}
            >
              {isLoading ? (
                <LoadingSpinner size="small" text="" />
              ) : (
                `Confirmar ${accionSeleccionada === 'Aceptada' ? 'Aceptación' : 'Rechazo'}`
              )}
            </button>
            <button
              onClick={() => setMostrarModal(false)}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal para ver documento */}
      <Modal
        isOpen={mostrarArchivo}
        onClose={() => setMostrarArchivo(false)}
        title="Documento de Identidad"
        size="large"
      >
        {inscripcion.rutaArchivo && (
          <div className="text-center">
            {inscripcion.rutaArchivo.toLowerCase().includes('.pdf') ? (
              <iframe
                src={inscripcion.rutaArchivo}
                className="w-full h-96 border rounded"
                title="Documento PDF"
              />
            ) : (
              <img
                src={inscripcion.rutaArchivo}
                alt="Documento de identidad"
                className="max-w-full h-auto rounded"
              />
            )}
          </div>
        )}
      </Modal>
    </>
  )
}

export default DetalleInscripcion