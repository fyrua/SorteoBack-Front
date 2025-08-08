

using SorteoBackend.Models.DTOs;

namespace SorteoBackend.Models.DTOs
{
    public class AdminLoginResponse
    {
        public bool Exito { get; set; }
        public string Mensaje { get; set; }= string.Empty;
        public string? Token { get; set; }
    }
}
