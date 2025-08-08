namespace SorteoBackend.Service
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(string userId, string username);
    }
}
