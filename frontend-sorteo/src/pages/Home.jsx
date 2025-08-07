import { Link } from 'react-router-dom'
import { Gift, Users, Trophy, ArrowRight } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Trophy className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            ¡Participa en Nuestro
            <span className="text-blue-600 block">Gran Sorteo!</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Inscríbete ahora y ten la oportunidad de ganar increíbles premios.
            Solo necesitas ser mayor de edad y completar tu registro.
          </p>
          
          <Link 
            to="/inscripcion"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Inscríbete Ahora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ¿Cómo Participar?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Regístrate</h3>
              <p className="text-gray-600">
                Completa el formulario con tus datos personales y adjunta tu documento de identidad.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Espera la Aprobación</h3>
              <p className="text-gray-600">
                Nuestro equipo revisará tu inscripción y te notificaremos por email el resultado.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. ¡Participa!</h3>
              <p className="text-gray-600">
                Una vez aprobado, estarás participando automáticamente en el sorteo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Qué Estás Esperando?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            La inscripción es gratuita y solo toma unos minutos.
          </p>
          <Link 
            to="/inscripcion"
            className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            Comenzar Inscripción
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home