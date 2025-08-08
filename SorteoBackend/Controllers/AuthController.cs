using Microsoft.AspNetCore.Mvc;
using SorteoBackend.Models.DTOs;
using SorteoBackend.Services;

namespace SorteoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var isValid = await _authService.ValidateLoginAsync(loginRequest);
            if (!isValid)
                return Unauthorized(new { message = "Credenciales inválidas" });

            // Aquí podrías generar un token si decides implementar JWT
            return Ok(new { message = "Inicio de sesión exitoso" });
        }
    }
}
