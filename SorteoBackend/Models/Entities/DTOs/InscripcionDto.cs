using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

public class InscripcionDto
{
    [Required]
    public required string Nombres { get; set; }

    [Required]
    public required string Apellidos { get; set; }

    [Required]
    [EmailAddress]
    public required string Correo { get; set; }

    [Required]
    public DateTime FechaNacimiento { get; set; }

    public string Direccion { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;

    public string NumeroDocumento { get; set; } = string.Empty;

    [Required]
    public required IFormFile Documento { get; set; }
}
