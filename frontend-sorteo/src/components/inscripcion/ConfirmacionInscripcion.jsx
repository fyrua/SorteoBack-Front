import { CheckCircle, Mail, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const ConfirmacionInscripcion = ({ inscripcion }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        ¡Inscripción Enviada Exitosamente!
      </h2>

      <p className="text-gray-600 mb-6">
        Tu inscripción ha sido recibida y está siendo procesada por nuestro equipo.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center space-x-2 text-blue-700 mb-2">
          <Mail className="w-5 h-5" />
          <span className="font-medium">Confirmación por Email</span>
        </div>
        <p className="text-blue-600 text-sm">
          Hemos enviado una confirmación a <strong>{inscripcion?.email}</strong>
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center space-x-2 text-yellow-700 mb-2">
          <Clock className="w-5 h-5" />
          <span className="font-medium">Tiempo de Procesamiento</span>
        </div>
        <p className="text-yellow-600 text-sm">
          Revisaremos tu inscripción en las próximas 24-48 horas y te notificaremos el resultado.
        </p>
      </div>

      <div className="space-y-3">
        <Link
          to="/"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 inline-block"
        >
          Volver al Inicio
        </Link>
        
        <p className="text-xs text-gray-500">
          Si tienes preguntas, contáctanos a info@sorteosyc.com
        </p>
      </div>
    </div>
  )
}

export default ConfirmacionInscripcion