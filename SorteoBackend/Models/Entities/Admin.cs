using System.ComponentModel.DataAnnotations;

namespace SorteoBackend.Models.Entities
{
    public class Admin
    {
        public int Id { get; set; }

        
        public required string Username { get; set; }

       
        public required string PasswordHash { get; set; }
    }
}

