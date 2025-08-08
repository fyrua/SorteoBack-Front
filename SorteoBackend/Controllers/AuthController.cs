using Microsoft.AspNetCore.Mvc;
using SorteoBackend.Models.DTOs;
using SorteoBackend.Service;
using SorteoBackend.Data;
using SorteoBackend.Models.Entities;

namespace SorteoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly ApplicationDbContext _context;

        public AuthController(AuthService authService, IJwtTokenGenerator jwtTokenGenerator, ApplicationDbContext context)
        {
            _authService = authService;
            _jwtTokenGenerator = jwtTokenGenerator;
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Username and password are required");
            }

            var admin = _context.Admins.FirstOrDefault(a => a.Username == request.Username);
            if (admin == null || !BCrypt.Net.BCrypt.Verify(request.Password, admin.PasswordHash))
                return Unauthorized("Credenciales incorrectas");

            var token = _jwtTokenGenerator.GenerateToken(admin.Id.ToString(), admin.Username);

            return Ok(new { token });
        }

    }
}
