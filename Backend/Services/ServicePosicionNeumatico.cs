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
            try
            {
                return await _context.PosicionesNeumaticos.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las posiciones de neumáticos: " + ex.Message);

            }
        }

        // POSICION NEUMATICO POR ID
        public async Task<PosicionNeumatico?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.PosicionesNeumaticos.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la posición de neumático: " + ex.Message);
            }
        }

        // NUEVO POSICION NEUMATICO
        public async Task<PosicionNeumatico> AddAsync(PosicionNeumatico posicionNeumatico)
        {
            try
            {
                _context.PosicionesNeumaticos.Add(posicionNeumatico);
                await _context.SaveChangesAsync();
                return posicionNeumatico;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar la posición de neumático: " + ex.Message);
            }
        }

        // UPDATE POSICION NEUMATICO
        public async Task<bool> UpdateAsync(PosicionNeumatico posicionNeumatico)
        {
            try
            {
                _context.PosicionesNeumaticos.Update(posicionNeumatico);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar la posición de neumático: " + ex.Message);
            }
        }

        // ELIMINAR POSICION NEUMATICO
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var posicionNeumatico = await _context.PosicionesNeumaticos.FindAsync(id);
                if (posicionNeumatico == null) return false;

                _context.PosicionesNeumaticos.Remove(posicionNeumatico);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar la posición de neumático: " + ex.Message);
            }
        }


    }
}