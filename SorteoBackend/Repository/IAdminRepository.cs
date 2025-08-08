using SorteoBackend.Models.Entities;
using System.Threading.Tasks;

namespace SorteoBackend.Repository
{
    public interface IAdminRepository
    {
        Task<Admin?> GetByIdAsync(int id);
        Task<Admin?> GetByUsernameAsync(string username);
        Task<List<Admin>> GetAllAsync();
        Task<Admin> CreateAsync(Admin admin);
        Task UpdateAsync(Admin admin);
        Task DeleteAsync(int id);
    }
}
