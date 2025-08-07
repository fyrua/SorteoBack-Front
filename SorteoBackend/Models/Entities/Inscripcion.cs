using System.ComponentModel.DataAnnotations;
public class Inscripcion
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Nombres { get; set; } = string.Empty;

    [Required]
    public string Apellidos { get; set; } = string.Empty;

    [Required]
    public string Correo { get; set; } = string.Empty;

    public DateTime FechaNacimiento { get; set; }

    public string Direccion { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;

    public string NumeroDocumento { get; set; } = string.Empty;

    public string DocumentoPath { get; set; } = string.Empty;

    public string Estado { get; set; } = "Pendiente";

    public DateTime FechaInscripcion { get; set; } = DateTime.Now;
}
