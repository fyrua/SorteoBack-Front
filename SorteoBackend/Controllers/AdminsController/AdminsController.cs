using Microsoft.AspNetCore.Mvc;
using SorteoBackend.Data;
using SorteoBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace SorteoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Admins/Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Admin admin)
        {
            string hashedPassword = ComputeSha256Hash(admin.PasswordHash);

            var existingAdmin = await _context.Admins
                .FirstOrDefaultAsync(a => a.Username == admin.Username && a.PasswordHash == hashedPassword);

            if (existingAdmin == null)
                return Unauthorized("Credenciales inválidas");

            return Ok("Login exitoso");
        }

        // Utilidad para hash SHA256
        private static string ComputeSha256Hash(string rawData)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                StringBuilder builder = new StringBuilder();
                foreach (var b in bytes)
                    builder.Append(b.ToString("x2"));
                return builder.ToString();
            }
        }

        // POST: api/Admins/Register (opcional para registrar un admin)
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Admin admin)
        {
            admin.PasswordHash = ComputeSha256Hash(admin.PasswordHash);
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
            return Ok("Administrador registrado");
        }
    }
}
