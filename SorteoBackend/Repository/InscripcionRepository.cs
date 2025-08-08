using SorteoBackend.Models;
using SorteoBackend.Data;

public class InscripcionRepository : IInscripcionRepository
{
    private readonly ApplicationDbContext _context;

    public InscripcionRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public void Add(Inscripcion inscripcion)
    {
        _context.Inscripciones.Add(inscripcion);
        _context.SaveChanges();
    }

    public Inscripcion? GetById(int id)
    {
        return _context.Inscripciones.Find(id);
    }

    public IEnumerable<Inscripcion> GetAll()
    {
        return _context.Inscripciones.ToList();
    }

    public void UpdateEstado(int id, string estado)
    {
        var inscripcion = _context.Inscripciones.Find(id);
        if (inscripcion != null)
        {
            inscripcion.Estado = estado;
            _context.SaveChanges();
        }
    }
}
