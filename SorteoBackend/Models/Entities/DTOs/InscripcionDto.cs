using Microsoft.AspNetCore.Http;
using System.Text.Json.Serialization;

namespace SorteoBackend.Models.Entities.DTOs
{
    public class InscripcionDto
    {
        public int Id { get; set; }
        public string Nombres { get; set; } = string.Empty;
        public string Apellidos { get; set; } = string.Empty;
        [JsonPropertyName("email")]
        public string Correo { get; set; } = string.Empty;

        [JsonPropertyName("tipoDocumento")]
        public string TipoDocumento { get; set; } = string.Empty;

        public DateTime FechaNacimiento { get; set; }
        public string Direccion { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string NumeroDocumento { get; set; } = string.Empty;
        public string RutaArchivo { get; set; } = string.Empty;
        public string Estado { get; set; } = "Pendiente";
        public DateTime FechaInscripcion { get; set; }
        public IFormFile? Documento { get; set; }
    }
}
