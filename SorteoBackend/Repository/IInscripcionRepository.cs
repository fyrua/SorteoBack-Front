public interface IInscripcionRepository
{
    void Add(Inscripcion inscripcion);
    Inscripcion? GetById(int id);
    IEnumerable<Inscripcion> GetAll();
    void UpdateEstado(int id, string estado);
}