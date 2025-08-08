# 🧪 Guía de Pruebas para la Aplicación de Sorteo SYC

Esta guía te ayudará a probar la aplicación de sorteo SYC paso a paso.

## 📋 **Pruebas sin Docker (Desarrollo Local)**

### 1. **Prueba del Backend (C#)**

```bash
# 1.1 Ejecutar el backend
cd SorteoBackend
dotnet run

# 1.2 Verificar que el backend está funcionando
# Abrir navegador en: http://localhost:8080/swagger
# Deberías ver la documentación Swagger con todos los endpoints

# 1.3 Probar endpoints con curl
# Registro de usuario
curl -X POST http://localhost:8080/api/inscripciones \
  -H "Content-Type: multipart/form-data" \
  -F "tipoDocumento=CC" \
  -F "numeroDocumento=123456789" \
  -F "nombres=Juan Pérez" \
  -F "fechaNacimiento=1990-01-01" \
  -F "direccion=Calle 123" \
  -F "telefono=3001234567" \
  -F "email=juan@example.com" \
  -F "documento=@ruta/al/documento.jpg"

# Login admin
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sorteosyc.com","password":"Admin123!"}'
```

### 2. **Prueba del Frontend (React)**

```bash
# 2.1 Ejecutar el frontend
cd frontend-sorteo
npm install
npm run dev

# 2.2 Abrir navegador en: http://localhost:5173
# 2.3 Probar flujos:
# - Registro de nuevo usuario
# - Login de administrador
# - Ver lista de inscripciones
# - Ver detalle de inscripción
# - Aceptar/Rechazar inscripción
```

## 📋 **Pruebas con Docker**

### 1. **Verificar que Docker está funcionando**
```bash
# Verificar estado de Docker
docker --version
docker-compose --version

# Si hay errores, verificar que Docker Desktop esté ejecutándose
# Windows: Buscar "Docker Desktop" en el menú inicio y ejecutarlo
```

### 2. **Ejecutar con Docker**
```bash
# Desde la carpeta principal del proyecto
docker-compose up --build

# Ver logs en tiempo real
docker-compose logs -f

# Si hay errores de conexión, verificar:
# - Docker Desktop está ejecutándose
# - Los puertos 3000, 8080, 1433 están disponibles
```

### 3. **Pruebas manuales con navegador**

#### 3.1 **Frontend**
- **URL**: http://localhost:3000
- **Acciones a probar**:
  - Llenar formulario de registro
  - Subir documento
  - Verificar mensaje de confirmación

#### 3.2 **Backend**
- **Swagger**: http://localhost:8080/swagger
- **Endpoints a probar**:
  - POST /api/inscripciones (registro)
  - POST /api/auth/login (login admin)
  - GET /api/inscripciones (listar inscripciones)
  - PUT /api/inscripciones/{id}/estado (cambiar estado)

#### 3.3 **Admin Dashboard**
- **Login**: http://localhost:3000/login
- **Credenciales**: admin@sorteosyc.com / Admin123!
- **Acciones**:
  - Ver lista de inscripciones
  - Ver detalle de cada inscripción
  - Aceptar/Rechazar inscripciones

## 🔧 **Solución de problemas comunes**

### Error: "El sistema no puede encontrar el archivo especificado"
```bash
# Solución 1: Verificar Docker Desktop
# Abrir Docker Desktop y esperar a que esté completamente cargado

# Solución 2: Verificar servicio Docker
# Windows: Ejecutar como administrador
net start com.docker.service

# Solución 3: Reiniciar Docker
# Cerrar Docker Desktop y volverlo a abrir
```

### Error: "Puerto ya en uso"
```bash
# Verificar puertos en uso
netstat -ano | findstr :8080
netstat -ano | findstr :3000
netstat -ano | findstr :1433

# Cambiar puertos en docker-compose.yml si es necesario
```

## 📊 **Checklist de pruebas**

### ✅ **Backend**
- [ ] Registro de usuario exitoso
- [ ] Login de administrador
- [ ] Listado de inscripciones
- [ ] Cambio de estado (Aceptar/Rechazar)
- [ ] Carga de archivos

### ✅ **Frontend**
- [ ] Formulario de registro funcional
- [ ] Login de administrador
- [ ] Dashboard muestra inscripciones
- [ ] Detalle de inscripción
- [ ] Botones de Aceptar/Rechazar funcionan

### ✅ **Base de datos**
- [ ] Datos se guardan correctamente
- [ ] Estados se actualizan
- [ ] Archivos se almacenan

## 🚀 **Comandos útiles para pruebas**

```bash
# Verificar estado de contenedores
docker ps

# Ver logs de un servicio específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs sqlserver

# Ejecutar comandos dentro de contenedores
docker exec -it sorteo-backend bash
docker exec -it sorteo-sqlserver bash
```

## 📞 **Si Docker no funciona**
Alternativa sin Docker:
1. Ejecutar backend: `dotnet run` en SorteoBackend
2. Ejecutar frontend: `npm run dev` en frontend-sorteo
3. Usar SQL Server local o SQLite
