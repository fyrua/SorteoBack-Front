import { Trophy, Mail, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Sorteo SYC</span>
            </div>
            <p className="text-gray-400 text-sm">
              Tu oportunidad de ganar está aquí. Participa en nuestro sorteo y 
              ten la posibilidad de llevarte increíbles premios.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@sorteosyc.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+57 300 123 4567</span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Términos y Condiciones</p>
              <p>Política de Privacidad</p>
              <p>Reglamento del Sorteo</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 Sorteo SYC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer