import FormularioInscripcion from '../components/inscripcion/FormularioInscripcion'

const Inscripcion = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Formulario de Inscripción
            </h1>
            <p className="text-gray-600">
              Completa todos los campos para participar en el sorteo.
              Asegúrate de que todos tus datos sean correctos.
            </p>
          </div>
          
          <FormularioInscripcion/>
        </div>
      </div>
    </div>
  )
}

export default Inscripcion