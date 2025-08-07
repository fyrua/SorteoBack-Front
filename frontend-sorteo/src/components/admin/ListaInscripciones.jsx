import { useState } from 'react'
import { Search, Filter, Calendar, User } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const ListaInscripciones = ({ 
  inscripciones, 
  onSeleccionar, 
  inscripcionSeleccionada, 
  filtro, 
  onFiltroChange 
}) => {
  const [busqueda, setBusqueda] = useState('')

  const inscripcionesFiltradas = inscripciones.filter(ins => {
    const textoCompleto = `${ins.nombres} ${ins.apellidos} ${ins.numeroDocumento}`.toLowerCase()
    return textoCompleto.includes(busqueda.toLowerCase())
  })

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800'
      case 'Aceptada':
        return 'bg-green-100 text-green-800'
      case 'Rechazada':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatearFecha = (fecha) => {
    try {
      return format(new Date(fecha), 'dd/MM/yyyy HH:mm', { locale: es })
    } catch {
      return 'Fecha inválida'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">
            Inscripciones ({inscripcionesFiltradas.length})
          </h3>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Filtros */}
            <select
              value={filtro}
              onChange={(e) => onFiltroChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendientes</option>
              <option value="aceptada">Aceptadas</option>
              <option value="rechazada">Rechazadas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="max-h-96 overflow-y-auto">
        {inscripcionesFiltradas.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No se encontraron inscripciones</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {inscripcionesFiltradas.map((inscripcion) => (
              <div
                key={inscripcion.id}
                onClick={() => onSeleccionar(inscripcion)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  inscripcionSeleccionada?.id === inscripcion.id
                    ? 'bg-blue-50 border-r-4 border-blue-500'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {inscripcion.nombres} {inscripcion.apellidos}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>#{inscripcion.numeroDocumento}</span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatearFecha(inscripcion.fechaInscripcion)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(inscripcion.estado)}`}>
                      {inscripcion.estado}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListaInscripciones