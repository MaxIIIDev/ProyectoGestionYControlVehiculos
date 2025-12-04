using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceMatafuego
    {
        private readonly AppDbContext _context;
        private readonly IMapper mapper;

        public ServiceMatafuego(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        // GET TODO MATAFUEGOS
        public async Task<PagedResponse<Matafuego>> GetAllAsync(int nroPagina, int tamanoPagina)
        {
            IQueryable<Matafuego> query = _context.Matafuegos;
            int totalRegistrosMatafuego = await query.CountAsync();
            List<Matafuego>? matafuegos = await query
                .OrderBy(m => m.IdMatafuego)
                .Skip((nroPagina - 1) * tamanoPagina)
                .Take(tamanoPagina)
                .ToListAsync();
            return new PagedResponse<Matafuego>(
                matafuegos,
                totalRegistrosMatafuego,
                nroPagina,
                tamanoPagina
            );
        }

        // MATAFUEGO POR ID
        public async Task<Matafuego?> GetByIdAsync(int id)
        {
            return await _context.Matafuegos.FindAsync(id);
        }

        public async Task<List<Matafuego>> getMatafuegoByNroSerieLike(string nroSerieLike)
        {
            return await _context
                .Matafuegos.Where(Matafuego =>
                    EF.Functions.Like(Matafuego.NroSerie.ToString(), $"%{nroSerieLike}%")
                )
                .ToListAsync();
        }

        // NUEVO MATAFUEGO
        public async Task<Matafuego> AddAsync(Matafuego matafuego)
        {
            _context.Matafuegos.Add(matafuego);
            await _context.SaveChangesAsync();
            return matafuego;
        }

        // UPDATE MATAFUEGO
        public async Task UpdateAsync(int id, UpdateMatafuegoDto matafuego)
        {
            Matafuego? matafuegoFinded = await this.GetByIdAsync(id);
            if (matafuegoFinded == null)
                throw new KeyNotFoundException("Matafuego con id " + id + " no encontrada");

            mapper.Map(matafuego, matafuegoFinded);

            await _context.SaveChangesAsync();
        }

        // ELIMINAR MATAFUEGO
        public async Task<bool> DeleteAsync(int id)
        {
            var matafuego = await _context.Matafuegos.FindAsync(id);
            if (matafuego == null)
                return false;

            _context.Matafuegos.Remove(matafuego);
            return await _context.SaveChangesAsync() > 0;
        }

        // BAJA LOGICA MATAFUEGO
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var matafuego = await _context.Matafuegos.FindAsync(id);
            if (matafuego == null)
                return false;

            matafuego.Estado = false;
            _context.Matafuegos.Update(matafuego);
            return await _context.SaveChangesAsync() > 0;
        }

        // ALTA LOGICA MATAFUEGO
        public async Task<bool> RestoreAsync(int id)
        {
            var matafuego = await _context.Matafuegos.FindAsync(id);
            if (matafuego == null)
                return false;

            matafuego.Estado = true;
            _context.Matafuegos.Update(matafuego);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
