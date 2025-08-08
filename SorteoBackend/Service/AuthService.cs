using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SorteoBackend.Data;
using SorteoBackend.Models.DTOs;
using Microsoft.EntityFrameworkCore;


using SorteoBackend.Service;


public class AuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(ApplicationDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public async Task<string?> LoginAsync(LoginRequest loginRequest)
    {
        var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Username == loginRequest.Username);
        if (admin == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, admin.PasswordHash))
            return null;

        // Crear claims
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, admin.Username),
            new Claim(ClaimTypes.Role, "Admin")
        };

        var jwtKey = _config["Jwt:Key"] ?? throw new ArgumentNullException("Jwt:Key not configured");
        var jwtIssuer = _config["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer not configured");
        var jwtAudience = _config["Jwt:Audience"] ?? throw new ArgumentNullException("Jwt:Audience not configured");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
