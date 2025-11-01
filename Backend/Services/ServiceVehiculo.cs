using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceVehiculo
    {
        private readonly AppDbContext _context;
        private readonly IMapper mapper;

        public ServiceVehiculo(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        // GET TODO VEHICULOS
        public async Task<List<Vehiculo>> GetAllAsync()
        {
            return await _context.Vehiculos.ToListAsync();
        }

        // VEHICULO POR ID
        public async Task<Vehiculo?> GetByIdAsync(int id)
        {
            return await _context.Vehiculos.FindAsync(id);
        }

        // NUEVO VEHICULO
        public async Task<Vehiculo> AddAsync(Vehiculo vehiculo)
        {
            _context.Vehiculos.Add(vehiculo);
            await _context.SaveChangesAsync();
            return vehiculo;
        }

        // UPDATE VEHICULO
        public async Task UpdateAsync(int id, UpdateVehiculoDto vehiculoDto)
        {
            Vehiculo? vehiculoFinded = await _context.Vehiculos.FindAsync(id);
            if (vehiculoFinded == null)
                throw new KeyNotFoundException("Vehiculo con id " + id + " no encontrado");
            mapper.Map(vehiculoDto, vehiculoFinded);
            _context.Vehiculos.Update(vehiculoFinded);
            await _context.SaveChangesAsync();
        }

        // ELIMINAR VEHICULO
        public async Task<bool> DeleteAsync(int id)
        {
            var vehiculo = await _context.Vehiculos.FindAsync(id);
            if (vehiculo == null) return false;
            _context.Vehiculos.Remove(vehiculo);
            return await _context.SaveChangesAsync() > 0;
        }

        // BAJA LOGICA VEHICULO
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var vehiculo = await _context.Vehiculos.FindAsync(id);
            if (vehiculo == null) return false;
            vehiculo.Estado = false;
            _context.Vehiculos.Update(vehiculo);
            return await _context.SaveChangesAsync() > 0;
        }

        // ALTA LOGICA VEHICULO
        public async Task<bool> RestoreAsync(int id)
        {
            var vehiculo = await _context.Vehiculos.FindAsync(id);
            if (vehiculo == null) return false;
            vehiculo.Estado = true;
            _context.Vehiculos.Update(vehiculo);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}