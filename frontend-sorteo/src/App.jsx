import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Inscripcion from './pages/Inscripcion'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscripcion" element={<Inscripcion />} />
          <Route path="/admin/login" element={<Login />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App