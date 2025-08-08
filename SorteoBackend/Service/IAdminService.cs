using SorteoBackend.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SorteoBackend.Service
{
    public interface IAdminService
    {
        Task<Admin> CreateAdminAsync(Admin admin);
        Task<Admin?> GetAdminByIdAsync(int id);
        Task<IEnumerable<Admin>> GetAllAdminsAsync();
        Task<Admin?> UpdateAdminAsync(int id, Admin updatedAdmin);
        Task<bool> DeleteAdminAsync(int id);
    }
}
