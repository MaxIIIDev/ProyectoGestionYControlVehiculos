using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{

    public class ServicePosicionNeumatico
    {
        private readonly AppDbContext _context;

        public ServicePosicionNeumatico(AppDbContext context)
        {
            _context = context;
        }

        // GET TODO POSICIONES NEUMATICOS
        public async Task<List<PosicionNeumatico>> GetAllAsync()
        {
            return await _context.PosicionesNeumaticos.ToListAsync();
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
        public async Task<bool> UpdateAsync(PosicionNeumatico posicionNeumatico)
        {
            _context.PosicionesNeumaticos.Update(posicionNeumatico);
            return await _context.SaveChangesAsync() > 0;
        }

        // ELIMINAR POSICION NEUMATICO
        public async Task<bool> DeleteAsync(int id)
        {
            var posicionNeumatico = await _context.PosicionesNeumaticos.FindAsync(id);
            if (posicionNeumatico == null) return false;

            _context.PosicionesNeumaticos.Remove(posicionNeumatico);
            return await _context.SaveChangesAsync() > 0;
        }


    }
}