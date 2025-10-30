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
            try
            {
                return await _context.Usuarios.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener los usuarios: " + ex.Message);

            }
        }

        // USUARIO POR ID
        public async Task<Usuario?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Usuarios.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el usuario: " + ex.Message);
            }
        }
        // NUEVO USUARIO
        public async Task<Usuario> AddAsync(Usuario usuario)
        {
            try
            {
                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();
                return usuario;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar el usuario: " + ex.Message);
            }
        }
        // UPDATE USUARIO
        public async Task<bool> UpdateAsync(Usuario usuario)
        {
            try
            {
                _context.Usuarios.Update(usuario);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar el usuario: " + ex.Message);
            }
        }
        // ELIMINAR USUARIO
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var usuario = await _context.Usuarios.FindAsync(id);
                if (usuario == null)
                    return false;

                _context.Usuarios.Remove(usuario);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el usuario: " + ex.Message);
            }
        }
        // BAJA LOGICA USUARIO
        public async Task<bool> SoftDeleteAsync(int id)
        {
            try
            {
                var usuario = await _context.Usuarios.FindAsync(id);
                if (usuario == null)
                    return false;

                usuario.Estado = false;
                _context.Usuarios.Update(usuario);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al dar de baja el usuario: " + ex.Message);
            }
        }
        //ALTA LOGICA USUARIO
        public async Task<bool> RestoreAsync(int id)
        {
            try
            {
                var usuario = await _context.Usuarios.FindAsync(id);
                if (usuario == null)
                    return false;

                usuario.Estado = true;
                _context.Usuarios.Update(usuario);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al restaurar el usuario: " + ex.Message);
            }
        }
    }
}