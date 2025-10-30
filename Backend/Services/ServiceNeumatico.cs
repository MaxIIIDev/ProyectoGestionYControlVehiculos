using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceNeumatico
    {
        private readonly AppDbContext _context;

        public ServiceNeumatico(AppDbContext context)
        {
            _context = context;
        }

        // GET TODO NEUMATICOS
        public async Task<List<Neumatico>> GetAllAsync()
        {
            return await _context.Neumaticos.ToListAsync();
        }

        // NEUMATICO POR ID
        public async Task<Neumatico?> GetByIdAsync(int id)
        {
            return await _context.Neumaticos.FindAsync(id);
        }

        // NUEVO NEUMATICO
        public async Task<Neumatico> AddAsync(Neumatico neumatico)
        {
            _context.Neumaticos.Add(neumatico);
            await _context.SaveChangesAsync();
            return neumatico;
        }

        // UPDATE NEUMATICO
        public async Task<bool> UpdateAsync(Neumatico neumatico)
        {
            _context.Neumaticos.Update(neumatico);
            return await _context.SaveChangesAsync() > 0;
        }

        // ELIMINAR NEUMATICO
        public async Task<bool> DeleteAsync(int id)
        {
            var neumatico = await _context.Neumaticos.FindAsync(id);
            if (neumatico == null) return false;

            _context.Neumaticos.Remove(neumatico);
            return await _context.SaveChangesAsync() > 0;
        }

        // BAJA LOGICA NEUMATICO
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var neumatico = await _context.Neumaticos.FindAsync(id);
            if (neumatico == null) return false;
            neumatico.Estado = false;
            _context.Neumaticos.Update(neumatico);
            return await _context.SaveChangesAsync() > 0;
        }

        // ALTA LOGICA NEUMATICO
        public async Task<bool> RestoreAsync(int id)
        {
            var neumatico = await _context.Neumaticos.FindAsync(id);
            if (neumatico == null) return false;
            neumatico.Estado = true;
            _context.Neumaticos.Update(neumatico);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}