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
            try
            {
                return await _context.Roles.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener los roles: " + ex.Message);

            }
        }

        // ROL POR ID
        public async Task<Rol?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Roles.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el rol: " + ex.Message);
            }
        }
        // NUEVO ROL
        public async Task<Rol> AddAsync(Rol rol)
        {
            try
            {
                _context.Roles.Add(rol);
                await _context.SaveChangesAsync();
                return rol;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar el rol: " + ex.Message);
            }
        }
        // UPDATE ROL
        public async Task<bool> UpdateAsync(Rol rol)
        {
            try
            {
                _context.Roles.Update(rol);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar el rol: " + ex.Message);
            }
        }
        // ELIMINAR ROL
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var rol = await _context.Roles.FindAsync(id);
                if (rol == null)
                    return false;

                _context.Roles.Remove(rol);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el rol: " + ex.Message);
            }
        }

        // BAJA LOGICA ROL
        public async Task<bool> SoftDeleteAsync(int id)
        {
            try
            {
                var rol = await _context.Roles.FindAsync(id);
                if (rol == null)
                    return false;

                rol.Estado = false;
                _context.Roles.Update(rol);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al realizar la baja lógica del rol: " + ex.Message);
            }
        }

        // ALTA LOGICA ROL
        public async Task<bool> RestoreAsync(int id)
        {
            try
            {
                var rol = await _context.Roles.FindAsync(id);
                if (rol == null)
                    return false;

                rol.Estado = true;
                _context.Roles.Update(rol);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al realizar el alta lógica del rol: " + ex.Message);
            }
        }
    }
}