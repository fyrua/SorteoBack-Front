using System.ComponentModel.DataAnnotations;
namespace SorteoBackend.Models.Entities
{
    public class Admin
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
    }
}
