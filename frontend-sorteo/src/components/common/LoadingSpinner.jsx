const LoadingSpinner = ({ size = 'medium', text = 'Cargando...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 ${sizeClasses[size]}`}></div>
      {text && <p className="mt-2 text-gray-600 text-sm">{text}</p>}
    </div>
  )
}

export default LoadingSpinner