using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceRol
    {
        private readonly AppDbContext _context;

        public ServiceRol(AppDbContext context)
        {
            _context = context;
        }

        // GET TODO ROLES
        public async Task<List<Rol>> GetAllAsync()
        {
            return await _context.Roles.ToListAsync();
        }

        // ROL POR ID
        public async Task<Rol?> GetByIdAsync(int id)
        {
            return await _context.Roles.FindAsync(id);
        }
        // NUEVO ROL
        public async Task<Rol> AddAsync(Rol rol)
        {
            _context.Roles.Add(rol);
            await _context.SaveChangesAsync();
            return rol;
        }
        // UPDATE ROL
        public async Task<bool> UpdateAsync(Rol rol)
        {
            _context.Roles.Update(rol);
            return await _context.SaveChangesAsync() > 0;
        }
        // ELIMINAR ROL
        public async Task<bool> DeleteAsync(int id)
        {
            var rol = await _context.Roles.FindAsync(id);
            if (rol == null)
                return false;

            _context.Roles.Remove(rol);
            return await _context.SaveChangesAsync() > 0;
        }

        // BAJA LOGICA ROL
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var rol = await _context.Roles.FindAsync(id);
            if (rol == null)
                return false;

            rol.Estado = false;
            _context.Roles.Update(rol);
            return await _context.SaveChangesAsync() > 0;
        }

        // ALTA LOGICA ROL
        public async Task<bool> RestoreAsync(int id)
        {
            var rol = await _context.Roles.FindAsync(id);
            if (rol == null)
                return false;

            rol.Estado = true;
            _context.Roles.Update(rol);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}