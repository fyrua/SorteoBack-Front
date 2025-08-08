using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SorteoBackend.Models.Entities

{
    public class Admin
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        
        public required string Username { get; set; }

       
        public required string PasswordHash { get; set; }
    }
}

