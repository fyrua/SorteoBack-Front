import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Trophy, LogOut, Settings } from 'lucide-react'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Sorteo SYC</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {!isAdminRoute && (
              <>
                <Link
                  to="/"
                  className={`text-gray-600 hover:text-blue-600 font-medium ${
                    location.pathname === '/' ? 'text-blue-600' : ''
                  }`}
                >
                  Inicio
                </Link>
                <Link
                  to="/inscripcion"
                  className={`text-gray-600 hover:text-blue-600 font-medium ${
                    location.pathname === '/inscripcion' ? 'text-blue-600' : ''
                  }`}
                >
                  Inscripción
                </Link>
              </>
            )}

            {/* Admin Section */}
            {isAuthenticated && isAdminRoute ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Bienvenido, <span className="font-medium">{user?.username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : !isAdminRoute ? (
              <Link
                to="/admin/login"
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 font-medium"
              >
                <Settings className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header