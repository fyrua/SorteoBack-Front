// Models/Dtos/AdminDto.cs
using System.ComponentModel.DataAnnotations;

namespace SorteoBackend.Models.Dtos
{
    public class AdminDto
    {
        [Required]
        public required string Username { get; set; }

        [Required]
        public required string Password { get; set; }  // Recibe la contraseña en texto plano
    }
}
