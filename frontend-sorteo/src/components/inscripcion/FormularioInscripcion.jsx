import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Upload, Calendar, User, Mail, Phone, MapPin, FileText, Camera } from 'lucide-react'
import { inscripcionService } from '../../services/inscripcionService'
import { validations } from '../../utils/validations'
import { TIPOS_DOCUMENTO } from '../../utils/constants'
import LoadingSpinner from '../common/LoadingSpinner'
import toast from 'react-hot-toast'

const FormularioInscripcion = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange'
  })

  const tipoDocumento = watch('tipoDocumento')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const validation = validations.file(file)
      if (validation !== true) {
        toast.error(validation)
        e.target.value = ''
        return
      }

      setSelectedFile(file)
      setValue('documento', file)
      
      // Crear preview si es imagen
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => setPreviewUrl(e.target.result)
        reader.readAsDataURL(file)
      } else {
        setPreviewUrl(null)
      }
    }
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      
      // Mapear campos del frontend al backend
      formData.append('nombres', data.nombres)
      formData.append('apellidos', data.apellidos)
      formData.append('correo', data.email)
      formData.append('fechaNacimiento', data.fechaNacimiento)
      formData.append('direccion', data.direccion)
      formData.append('telefono', data.telefono)
      formData.append('numeroDocumento', data.numeroDocumento)
      
      // Agregar archivo
      if (selectedFile) {
        formData.append('documento', selectedFile)
      }

      await inscripcionService.crearInscripcion(formData)
      
      toast.success('¡Inscripción enviada exitosamente!')
      navigate('/', { 
        state: { 
          message: 'Tu inscripción ha sido enviada. Te contactaremos pronto.' 
        }
      })
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tipo y Número de Documento */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline w-4 h-4 mr-1" />
              Tipo de Documento *
            </label>
            <select
              {...register('tipoDocumento', { required: 'Selecciona un tipo de documento' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecciona...</option>
              {TIPOS_DOCUMENTO.map(tipo => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
            {errors.tipoDocumento && (
              <p className="mt-1 text-sm text-red-600">{errors.tipoDocumento.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Documento *
            </label>
            <input
              type="text"
              {...register('numeroDocumento', {
                required: 'El número de documento es obligatorio',
                validate: (value) => validations.document(value, tipoDocumento)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: 1234567890"
            />
            {errors.numeroDocumento && (
              <p className="mt-1 text-sm text-red-600">{errors.numeroDocumento.message}</p>
            )}
          </div>
        </div>

        {/* Nombres y Apellidos */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-1" />
              Nombres *
            </label>
            <input
              type="text"
              {...register('nombres', {
                required: 'Los nombres son obligatorios',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Juan Carlos"
            />
            {errors.nombres && (
              <p className="mt-1 text-sm text-red-600">{errors.nombres.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellidos *
            </label>
            <input
              type="text"
              {...register('apellidos', {
                required: 'Los apellidos son obligatorios',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Pérez García"
            />
            {errors.apellidos && (
              <p className="mt-1 text-sm text-red-600">{errors.apellidos.message}</p>
            )}
          </div>
        </div>

        {/* Fecha de Nacimiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Fecha de Nacimiento *
          </label>
          <input
            type="date"
            {...register('fechaNacimiento', {
              required: 'La fecha de nacimiento es obligatoria',
              validate: validations.age
            })}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.fechaNacimiento && (
            <p className="mt-1 text-sm text-red-600">{errors.fechaNacimiento.message}</p>
          )}
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Dirección *
          </label>
          <input
            type="text"
            {...register('direccion', {
              required: 'La dirección es obligatoria',
              minLength: { value: 10, message: 'Mínimo 10 caracteres' }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Calle 123 #45-67, Barrio Centro"
          />
          {errors.direccion && (
            <p className="mt-1 text-sm text-red-600">{errors.direccion.message}</p>
          )}
        </div>

        {/* Teléfono y Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-1" />
              Teléfono *
            </label>
            <input
              type="tel"
              {...register('telefono', {
                required: 'El teléfono es obligatorio',
                validate: validations.phone
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: 3001234567"
            />
            {errors.telefono && (
              <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-1" />
              Correo Electrónico *
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'El email es obligatorio',
                validate: validations.email
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: juan@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Archivo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Upload className="inline w-4 h-4 mr-1" />
            Documento de Identidad *
          </label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            {previewUrl ? (
              <div className="space-y-4">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-w-full h-32 mx-auto object-contain rounded"
                />
                <p className="text-sm text-gray-600">{selectedFile.name}</p>
              </div>
            ) : selectedFile ? (
              <div className="space-y-2">
                <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600">{selectedFile.name}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-gray-600">
                  Arrastra tu archivo aquí o haz clic para seleccionar
                </p>
                <p className="text-sm text-gray-400">
                  PDF, JPG, PNG (máx. 5MB)
                </p>
              </div>
            )}
            
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          {errors.archivo && (
            <p className="mt-1 text-sm text-red-600">{errors.archivo.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <LoadingSpinner size="small" text="Enviando..." />
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Enviar Inscripción
              </>
            )}
          </button>
        </div>

        {/* Legal Notice */}
        <div className="text-xs text-gray-500 text-center pt-4 border-t">
          Al enviar este formulario, aceptas nuestros términos y condiciones y 
          autorizas el uso de tus datos para el sorteo.
        </div>
      </form>
    </div>
  )
}

export default FormularioInscripcion