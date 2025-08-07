using Microsoft.EntityFrameworkCore;
using SorteoBackend.Models.Entities;

namespace SorteoBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Inscripcion> Inscripciones { get; set; }
    }
}
