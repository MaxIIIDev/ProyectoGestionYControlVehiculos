using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceVehiculo
    {
        private readonly AppDbContext _context;

        public ServiceVehiculo(AppDbContext context)
        {
            _context = context;
        }

        // GET TODO VEHICULOS
        public async Task<List<Vehiculo>> GetAllAsync()
        {
            try
            {
                return await _context.Vehiculos.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener los vehículos: " + ex.Message);

            }
        }

        // VEHICULO POR ID
        public async Task<Vehiculo?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Vehiculos.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el vehículo: " + ex.Message);
            }
        }

        // NUEVO VEHICULO
        public async Task<Vehiculo> AddAsync(Vehiculo vehiculo)
        {
            try
            {
                _context.Vehiculos.Add(vehiculo);
                await _context.SaveChangesAsync();
                return vehiculo;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar el vehículo: " + ex.Message);
            }
        }

        // UPDATE VEHICULO
        public async Task<bool> UpdateAsync(Vehiculo vehiculo)
        {
            try
            {
                _context.Vehiculos.Update(vehiculo);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar el vehículo: " + ex.Message);
            }
        }

        // ELIMINAR VEHICULO
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var vehiculo = await _context.Vehiculos.FindAsync(id);
                if (vehiculo == null) return false;
                _context.Vehiculos.Remove(vehiculo);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el vehículo: " + ex.Message);
            }
        }

        // BAJA LOGICA VEHICULO
        public async Task<bool> SoftDeleteAsync(int id)
        {
            try
            {
                var vehiculo = await _context.Vehiculos.FindAsync(id);
                if (vehiculo == null) return false;
                vehiculo.Estado = false;
                _context.Vehiculos.Update(vehiculo);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el vehículo: " + ex.Message);
            }
        }

        // ALTA LOGICA VEHICULO
        public async Task<bool> RestoreAsync(int id)
        {
            try
            {
                var vehiculo = await _context.Vehiculos.FindAsync(id);
                if (vehiculo == null) return false;
                vehiculo.Estado = true;
                _context.Vehiculos.Update(vehiculo);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al restaurar el vehículo: " + ex.Message);
            }
        }
    }
}