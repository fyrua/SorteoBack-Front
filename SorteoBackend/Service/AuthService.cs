using SorteoBackend.Data;
using SorteoBackend.Models.DTOs;
using SorteoBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace SorteoBackend.Services
{
    public class AuthService
    {
        private readonly ApplicationDbContext _context;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ValidateLoginAsync(LoginRequest loginRequest)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Username == loginRequest.Username);
            if (admin == null)
                return false;

            return BCrypt.Net.BCrypt.Verify(loginRequest.Password, admin.PasswordHash);
        }
    }
}
