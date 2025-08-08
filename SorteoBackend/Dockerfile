# Usar la imagen oficial de .NET 8
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Usar la imagen de SDK para construir
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar archivos de proyecto
COPY ["SorteoBackend.csproj", "."]
COPY ["SorteoBackend.sln", "."]

# Restaurar dependencias
RUN dotnet restore "SorteoBackend.csproj"

# Copiar todo el código fuente
COPY . .

# Construir la aplicación
RUN dotnet build "SorteoBackend.csproj" -c Release -o /app/build

# Publicar la aplicación
FROM build AS publish
RUN dotnet publish "SorteoBackend.csproj" -c Release -o /app/publish

# Imagen final
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SorteoBackend.dll"]
