using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceRol
    {
        private readonly AppDbContext _context;
        private readonly IMapper mapper;

        public ServiceRol(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        // GET TODO ROLES
        public async Task<List<Rol>> GetAllAsync(int numeroPagina, int tamanoPagina)
        {
            IQueryable<Rol> query = _context.Roles;
            int totalRegistrosRol = await query.CountAsync();
            List<Rol>? roles = await query
                .OrderBy(r => r.IdRol)
                .Skip((numeroPagina - 1) * tamanoPagina)
                .Take(tamanoPagina)
                .ToListAsync();
            return roles;
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
        public async Task UpdateAsync(int id, UpdateRolDto rolDto)
        {
            Rol? rolFinded = await _context.Roles.FindAsync(id);
            if (rolFinded == null)
                throw new KeyNotFoundException("Rol con id " + id + " no encontrada");

            mapper.Map(rolDto, rolFinded);
            _context.Roles.Update(rolFinded);
            await _context.SaveChangesAsync();
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
