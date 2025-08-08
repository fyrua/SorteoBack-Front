using Microsoft.AspNetCore.Mvc;
using SorteoBackend.Models;
using SorteoBackend.Service;
using SorteoBackend.Models.Entities;



namespace SorteoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminsController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminsController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        // POST: api/Admins
        [HttpPost]
        public async Task<IActionResult> CreateAdmin([FromBody] Admin admin)
        {
            if (admin == null)
            {
                return BadRequest("Datos del administrador inválidos.");
            }

            try
            {
                var createdAdmin = await _adminService.CreateAdminAsync(admin);
                return CreatedAtAction(nameof(GetAdminById), new { id = createdAdmin.Id }, createdAdmin);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al crear el administrador: {ex.Message}");
            }
        }

        // GET: api/Admins/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAdminById(int id)
        {
            var admin = await _adminService.GetAdminByIdAsync(id);

            if (admin == null)
            {
                return NotFound();
            }

            return Ok(admin);
        }

        // GET: api/Admins
        [HttpGet]
        public async Task<IActionResult> GetAllAdmins()
        {
            var admins = await _adminService.GetAllAdminsAsync();
            return Ok(admins);
        }

        // PUT: api/Admins/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdmin(int id, [FromBody] Admin admin)
        {
            if (id != admin.Id)
            {
                return BadRequest("El ID del administrador no coincide.");
            }

            try
            {
                var updatedAdmin = await _adminService.UpdateAdminAsync(id, admin);

                if (updatedAdmin == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar el administrador: {ex.Message}");
            }
        }

        // DELETE: api/Admins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            try
            {
                var deleted = await _adminService.DeleteAdminAsync(id);

                if (!deleted)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar el administrador: {ex.Message}");
            }
        }
    }
}
