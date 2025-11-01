using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceUsuario
    {
        private readonly AppDbContext _context;
        private readonly IMapper mapper;

        public ServiceUsuario(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
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
        public async Task UpdateAsync(int id, UpdateUsuarioDto usuarioDto)
        {
            Usuario? usuarioFinded = await _context.Usuarios.FindAsync(id);
            if (usuarioFinded == null)
                throw new KeyNotFoundException("Usuario con id " + id + " no encontrado");
            mapper.Map(usuarioDto, usuarioFinded);
            _context.Usuarios.Update(usuarioFinded);
            await _context.SaveChangesAsync();
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