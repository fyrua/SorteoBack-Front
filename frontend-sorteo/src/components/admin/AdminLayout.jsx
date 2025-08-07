import { useAuth } from '../../context/AuthContext'
import { BarChart3, Users, Settings } from 'lucide-react'

const AdminLayout = ({ children }) => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Admin Header */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Panel de Administración
                </h2>
                <p className="text-sm text-gray-600">
                  Gestión de inscripciones del sorteo
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Admin: {user?.username}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  )
}

export default AdminLayout