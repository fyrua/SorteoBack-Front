# ⚡ Prueba Rápida (Sin Docker)

Si Docker no funciona, prueba la aplicación así:

## 1. Backend
```bash
cd SorteoBackend
dotnet run
# Abrir: http://localhost:8080/swagger
```

## 2. Frontend
```bash
cd frontend-sorteo
npm install
npm run dev
# Abrir: http://localhost:5173
```

## 3. Probar flujos:
- Registro: http://localhost:5173/inscripcion
- Admin: http://localhost:5173/login (admin@sorteosyc.com / Admin123!)
- API: http://localhost:8080/swagger
