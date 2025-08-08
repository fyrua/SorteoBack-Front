# 🎯 Guía Final de Configuración y Pruebas - Sorteo SYC

## ✅ Estado del Proyecto
El proyecto está completamente implementado. El error de conexión SQL es normal cuando no hay base de datos configurada.

## 🔧 Configuración de Base de Datos

### Opción 1: SQL Server Local (Recomendado)
```bash
# 1. Instalar SQL Server Express
# Descargar desde: https://www.microsoft.com/sql-server/sql-server-downloads

# 2. Actualizar connection string en appsettings.json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=SorteoSYC;Trusted_Connection=true;TrustServerCertificate=true"
}
```

### Opción 2: SQLite (Más simple)
```bash
# 1. Instalar paquete SQLite
dotnet add package Microsoft.EntityFrameworkCore.Sqlite

# 2. Actualizar connection string en appsettings.json
"ConnectionStrings": {
  "DefaultConnection": "Data Source=SorteoSYC.db"
}
```

### Opción 3: SQL Server en Docker
```bash
# 1. Ejecutar SQL Server en Docker
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=SorteoSYC2024!" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest

# 2. Actualizar connection string
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost,1433;Database=SorteoSYC;User=sa;Password=SorteoSYC2024!;TrustServerCertificate=true"
}
```

## 🚀 Pasos para ejecutar

### 1. Configurar base de datos
```bash
cd SorteoBackend
# Aplicar migraciones
dotnet ef database update
# Si no existe la migración:
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 2. Ejecutar backend
```bash
dotnet run
# Backend ejecutándose en: http://localhost:5224
# Swagger: http://localhost:5224/swagger
```

### 3. Ejecutar frontend
```bash
cd frontend-sorteo
npm install
npm run dev
# Frontend en: http://localhost:5173
```

## 📋 URLs de prueba
- **Frontend**: http://localhost:5173
- **Registro**: http://localhost:5173/inscripcion
- **Admin**: http://localhost:5173/login
- **API**: http://localhost:5224/swagger

## 🎯 Credenciales de prueba
- **Admin**: admin@sorteosyc.com / Admin123!

## ✅ Características implementadas
- Registro de usuarios con documentos
- Autenticación de administradores
- Gestión de inscripciones (Aceptar/Rechazar)
- Carga de archivos (imágenes/PDF)
- Diseño responsivo
- API REST completa con Swagger
- Frontend React con Tailwind CSS

## 🏆 Conclusión
El proyecto está completamente implementado y solo necesita configurar la base de datos para funcionar correctamente.
