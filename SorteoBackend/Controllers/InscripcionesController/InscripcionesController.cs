using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // GET: api/Inscripcion
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var inscripciones = await _context.Inscripciones.ToListAsync();
            return Ok(inscripciones);
        }

        // GET: api/Inscripcion/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var inscripcion = await _context.Inscripciones.FindAsync(id);
            if (inscripcion == null)
                return NotFound();

            return Ok(inscripcion);
        }

        // POST: api/Inscripcion
       [HttpPost]
public async Task<IActionResult> CreateInscripcion([FromForm] InscripcionDto inscripcionDto)
{
    // Validar mayoría de edad
    var edad = DateTime.Today.Year - inscripcionDto.FechaNacimiento.Year;
    if (inscripcionDto.FechaNacimiento.Date > DateTime.Today.AddYears(-edad)) edad--;

    if (edad < 18)
    {
        return BadRequest("El participante debe ser mayor de edad.");
    }

    // Validar archivo
    if (inscripcionDto.Documento == null || inscripcionDto.Documento.Length == 0)
    {
        return BadRequest("Debe subir un documento válido.");
    }

    // Guardar archivo en carpeta local
    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Documentos");
    Directory.CreateDirectory(uploadsFolder);

    var fileName = $"{Guid.NewGuid()}_{inscripcionDto.Documento.FileName}";
    var filePath = Path.Combine(uploadsFolder, fileName);

    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await inscripcionDto.Documento.CopyToAsync(stream);
    }

    // Crear entidad
    var inscripcion = new Inscripcion
    {
        Nombres = inscripcionDto.Nombres,
        Apellidos = inscripcionDto.Apellidos,
        Correo = inscripcionDto.Correo,
        FechaNacimiento = inscripcionDto.FechaNacimiento,
        Direccion = inscripcionDto.Direccion,
        Telefono = inscripcionDto.Telefono,
        NumeroDocumento = inscripcionDto.NumeroDocumento,
        DocumentoPath = filePath
    };

    _context.Inscripciones.Add(inscripcion);
    await _context.SaveChangesAsync();

    return Ok(inscripcion);
}

        // PUT: api/Inscripcion/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Inscripcion inscripcion)
        {
            if (id != inscripcion.Id)
                return BadRequest("ID no coincide");

            _context.Entry(inscripcion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Inscripciones.Any(i => i.Id == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        // PUT: api/Inscripcion/{id}/estado
        [HttpPut("{id}/estado")]
        public async Task<IActionResult> CambiarEstado(int id, [FromBody] string nuevoEstado)
        {
            var inscripcion = await _context.Inscripciones.FindAsync(id);
            if (inscripcion == null)
                return NotFound();

            if (nuevoEstado != "Aceptada" && nuevoEstado != "Rechazada")
                return BadRequest("Estado inválido.");

            inscripcion.Estado = nuevoEstado;
            await _context.SaveChangesAsync();

            // TODO: Enviar correo electrónico al usuario inscripto notificando el cambio de estado

            return Ok(inscripcion);
        }

        // GET: api/Inscripcion/{id}/documento
        [HttpGet("{id}/documento")]
        public async Task<IActionResult> DescargarDocumento(int id)
        {
            var inscripcion = await _context.Inscripciones.FindAsync(id);
            if (inscripcion == null || string.IsNullOrEmpty(inscripcion.DocumentoPath))
                return NotFound();

            var fileBytes = await System.IO.File.ReadAllBytesAsync(inscripcion.DocumentoPath);
            var fileName = Path.GetFileName(inscripcion.DocumentoPath);
            var contentType = inscripcion.DocumentoPath.EndsWith(".pdf") ? "application/pdf" : "image/jpeg";
            return File(fileBytes, contentType, fileName);
        }

        // DELETE: api/Inscripcion/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var inscripcion = await _context.Inscripciones.FindAsync(id);
            if (inscripcion == null)
                return NotFound();

            _context.Inscripciones.Remove(inscripcion);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
