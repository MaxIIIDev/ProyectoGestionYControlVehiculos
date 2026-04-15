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
        public async Task<PagedResponse<UsuarioDto>> GetAllAsync(int nroPagina, int tamanoPagina)
        {
            IQueryable<Usuario> query = _context
                .Usuarios.Include(u => u.Persona)
                .Include(u => u.Rol);
            int totalRegistrosUsuario = await query.CountAsync();
            List<UsuarioDto>? usuarios = await query
                .OrderBy(u => u.IdUsuario)
                .Skip((nroPagina - 1) * tamanoPagina)
                .Take(tamanoPagina)
                .Select(u => new UsuarioDto
                {
                    IdUsuario = u.IdUsuario,
                    Gmail = u.Gmail,
                    AvatarUrl = u.AvatarUrl,
                    IdRol = u.IdRol,
                    Rol = u.Rol,
                    IdPersona = u.IdPersona,
                    Persona = u.Persona,
                    Estado = u.Estado,
                })
                .ToListAsync();
            return new PagedResponse<UsuarioDto>(
                usuarios,
                totalRegistrosUsuario,
                nroPagina,
                tamanoPagina
            );
        }

        // USUARIO POR ID
        public async Task<UsuarioDto?> GetByIdAsync(int id)
        {
            Usuario? usuario = await _context
                .Usuarios.Include(u => u.Persona)
                .Include(u => u.Rol)
                .FirstOrDefaultAsync(u => u.IdUsuario == id);
            if (usuario == null)
                return null;
            return new UsuarioDto
            {
                IdUsuario = usuario.IdUsuario,
                Gmail = usuario.Gmail,
                AvatarUrl = usuario.AvatarUrl,
                IdRol = usuario.IdRol,
                Rol = usuario.Rol,
                IdPersona = usuario.IdPersona,
                Persona = usuario.Persona,
                Estado = usuario.Estado,
            };
        }

        public async Task<Usuario?> getUsuarioByIdPersonaAsync(int id)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.IdPersona == id);
        }

        public async Task<Usuario?> getUsuarioByEmailAsync(string gmail)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Gmail == gmail);
        }

        // NUEVO USUARIO
        public async Task<Usuario> AddAsync(Usuario usuario)
        {
            if (await this.getUsuarioByEmailAsync(usuario.Gmail) is not null)
                throw new InvalidOperationException(
                    "El usuario con gmail " + usuario.Gmail + " ya existe"
                );
            if (await this.getUsuarioByIdPersonaAsync(usuario.IdPersona) is not null)
            {
                throw new InvalidOperationException(
                    "La persona con id " + usuario.IdPersona + " ya tiene un usuario"
                );
            }
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
            if (usuarioFinded.Gmail != usuarioDto.Gmail && usuarioFinded.IdUsuario != id)
                throw new InvalidOperationException(
                    "El usuario con gmail " + usuarioDto.Gmail + " ya existe"
                );
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
