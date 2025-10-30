using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceUsuario
    {
        private readonly AppDbContext _context;

        public ServiceUsuario(AppDbContext context)
        {
            _context = context;
        }

        // GET TODO USUARIOS
        public async Task<List<Usuario>> GetAllAsync()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // USUARIO POR ID
        public async Task<Usuario?> GetByIdAsync(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }
        // NUEVO USUARIO
        public async Task<Usuario> AddAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }
        // UPDATE USUARIO
        public async Task<bool> UpdateAsync(Usuario usuario)
        {
            _context.Usuarios.Update(usuario);
            return await _context.SaveChangesAsync() > 0;
        }
        // ELIMINAR USUARIO
        public async Task<bool> DeleteAsync(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
                return false;

            _context.Usuarios.Remove(usuario);
            return await _context.SaveChangesAsync() > 0;
        }
        // BAJA LOGICA USUARIO
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
                return false;

            usuario.Estado = false;
            _context.Usuarios.Update(usuario);
            return await _context.SaveChangesAsync() > 0;
        }
        //ALTA LOGICA USUARIO
        public async Task<bool> RestoreAsync(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
                return false;

            usuario.Estado = true;
            _context.Usuarios.Update(usuario);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}