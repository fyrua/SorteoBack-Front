using SorteoBackend.Models.Entities;
using SorteoBackend.Data;
using Microsoft.EntityFrameworkCore;
using SorteoBackend.Service;

public class AdminService : IAdminService
{
    private readonly ApplicationDbContext _context;

    public AdminService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Admin> CreateAdminAsync(Admin admin)
    {
        _context.Admins.Add(admin);
        await _context.SaveChangesAsync();
        return admin;
    }

    public async Task<Admin?> GetAdminByIdAsync(int id)
    {
        return await _context.Admins.FindAsync(id);
    }

    public async Task<IEnumerable<Admin>> GetAllAdminsAsync()
    {
        return await _context.Admins.ToListAsync();
    }

    public async Task<Admin?> UpdateAdminAsync(int id, Admin updatedAdmin)
    {
        var admin = await _context.Admins.FindAsync(id);
        if (admin == null) return null;

            admin.Username = updatedAdmin.Username;
            admin.PasswordHash = updatedAdmin.PasswordHash;

            await _context.SaveChangesAsync();
            return admin;
    }

    public async Task<bool> DeleteAdminAsync(int id)
    {
        var admin = await _context.Admins.FindAsync(id);
        if (admin == null) return false;

        _context.Admins.Remove(admin);
        await _context.SaveChangesAsync();
        return true;
    }
}
