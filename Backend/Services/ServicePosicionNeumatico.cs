using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServicePosicionNeumatico
    {
        private readonly AppDbContext _context;
        private readonly IMapper mapper;

        public ServicePosicionNeumatico(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        // GET TODO POSICIONES NEUMATICOS
        public async Task<List<PosicionNeumatico>> GetAllAsync(int nroPagina, int tamanoPagina)
        {
            IQueryable<PosicionNeumatico> query = _context.PosicionesNeumaticos;
            int totalRegistrosPosicionNeumatico = await query.CountAsync();
            List<PosicionNeumatico>? posicionesNeumaticos = await query
                .OrderBy(p => p.IdPosicionNeumatico)
                .Skip((nroPagina - 1) * tamanoPagina)
                .Take(tamanoPagina)
                .ToListAsync();
            return posicionesNeumaticos;
        }

        // POSICION NEUMATICO POR ID
        public async Task<PosicionNeumatico?> GetByIdAsync(int id)
        {
            return await _context.PosicionesNeumaticos.FindAsync(id);
        }

        // NUEVO POSICION NEUMATICO
        public async Task<PosicionNeumatico> AddAsync(PosicionNeumatico posicionNeumatico)
        {
            _context.PosicionesNeumaticos.Add(posicionNeumatico);
            await _context.SaveChangesAsync();
            return posicionNeumatico;
        }

        // UPDATE POSICION NEUMATICO
        public async Task UpdateAsync(int id, UpdatePosicionNeumaticoDto posDto)
        {
            PosicionNeumatico? posFinded = await _context.PosicionesNeumaticos.FindAsync(id);
            if (posFinded == null)
                throw new KeyNotFoundException(
                    "Posicion Neumatico con id " + id + " no encontrada"
                );
            mapper.Map(posDto, posFinded);
            await _context.SaveChangesAsync();
        }

        // ELIMINAR POSICION NEUMATICO
        public async Task<bool> DeleteAsync(int id)
        {
            var posicionNeumatico = await _context.PosicionesNeumaticos.FindAsync(id);
            if (posicionNeumatico == null)
                return false;

            _context.PosicionesNeumaticos.Remove(posicionNeumatico);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
