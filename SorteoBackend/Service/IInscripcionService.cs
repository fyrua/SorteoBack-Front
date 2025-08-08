public interface IInscripcionService
{
    void Inscribir(Inscripcion inscripcion);
    Inscripcion? ObtenerPorId(int id);
    IEnumerable<Inscripcion> ObtenerTodas();
    void CambiarEstado(int id, string estado);
}