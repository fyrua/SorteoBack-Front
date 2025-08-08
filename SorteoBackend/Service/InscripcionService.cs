using SorteoBackend.Models;

public class InscripcionService : IInscripcionService
{
    private readonly IInscripcionRepository _repository;

    public InscripcionService(IInscripcionRepository repository)
    {
        _repository = repository;
    }

    public void Inscribir(Inscripcion inscripcion)
    {
        inscripcion.FechaInscripcion = DateTime.Now;
        inscripcion.Estado = "Pendiente";
        _repository.Add(inscripcion);
    }

    public Inscripcion? ObtenerPorId(int id)
    {
        return _repository.GetById(id);
    }

    public IEnumerable<Inscripcion> ObtenerTodas()
    {
        return _repository.GetAll();
    }

    public void CambiarEstado(int id, string estado)
    {
        _repository.UpdateEstado(id, estado);
    }
}
