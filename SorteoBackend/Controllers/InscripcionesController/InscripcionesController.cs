using Microsoft.AspNetCore.Mvc;
using SorteoBackend.Data;
using SorteoBackend.Models.Entities;

namespace SorteoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InscripcionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InscripcionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Inscripciones.ToList());
        }
    }
}
