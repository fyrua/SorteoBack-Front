using SorteoBackend.Models.DTOs;


namespace SorteoBackend.Models.DTOs
{
    public class AdminLoginRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
