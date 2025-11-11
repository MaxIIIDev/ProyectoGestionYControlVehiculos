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
        public async Task<List<Vehiculo>> GetAllAsync(int nroPagina, int tamanoPagina)
        {
            IQueryable<Vehiculo> query = _context.Vehiculos;
            int totalRegistrosVehiculo = await query.CountAsync();
            List<Vehiculo>? vehiculos = await query
                .OrderBy(v => v.IdVehiculo)
                .Skip((nroPagina - 1) * tamanoPagina)
                .Take(tamanoPagina)
                .ToListAsync();
            return vehiculos;
        }

        // VEHICULO POR ID
        public async Task<Vehiculo?> GetByIdAsync(int id)
        {
            return await _context.Vehiculos.FindAsync(id);
        }

        // GET VEHICULO POR PATENTE
        public async Task<Vehiculo?> GetByPatenteAsync(string patente)
        {
            return await _context.Vehiculos.FirstOrDefaultAsync(v => v.Patente == patente);
        }

        // GET VEHICULO POR NUMERO DE MOTOR
        public async Task<Vehiculo?> GetByNumeroMotorAsync(string numeroMotor)
        {
            return await _context.Vehiculos.FirstOrDefaultAsync(v => v.NumeroMotor == numeroMotor);
        }

        // GET VEHICULO POR NUMERO DE CHASIS
        public async Task<Vehiculo?> GetByNumeroChasisAsync(string numeroChasis)
        {
            return await _context.Vehiculos.FirstOrDefaultAsync(v =>
                v.NumeroChasis == numeroChasis
            );
        }

        // NUEVO VEHICULO
        public async Task<Vehiculo> AddAsync(Vehiculo vehiculo)
        {
            if (await GetByPatenteAsync(vehiculo.Patente) != null)
                throw new InvalidOperationException(
                    "Ya existe un vehiculo con la patente " + vehiculo.Patente
                ); //Manejar en el controller
            if (await GetByNumeroMotorAsync(vehiculo.NumeroMotor) != null)
                throw new InvalidOperationException(
                    "Ya existe un vehiculo con el numero de motor " + vehiculo.NumeroMotor
                ); //Manejar en el controller
            if (await GetByNumeroChasisAsync(vehiculo.NumeroChasis) != null)
                throw new InvalidOperationException(
                    "Ya existe un vehiculo con el numero de chasis " + vehiculo.NumeroChasis
                ); //Manejar en el controller
            _context.Vehiculos.Add(vehiculo);
            await _context.SaveChangesAsync();
            return vehiculo;
        }

        // UPDATE VEHICULO
        public async Task UpdateAsync(int id, UpdateVehiculoDto vehiculoDto)
        {
            Vehiculo? vehiculoFinded = await _context.Vehiculos.FindAsync(id);
            if (
                vehiculoFinded != null
                && vehiculoDto.NumeroChasis != null
                && await GetByNumeroChasisAsync((string)vehiculoDto.NumeroChasis)
                    is Vehiculo vehiculoExistente
                && vehiculoExistente.IdVehiculo != id
            )
                throw new InvalidOperationException(
                    "Ya existe un vehiculo con el numero de chasis " + vehiculoDto.NumeroChasis
                ); //Manejar en el controller
            if (
                vehiculoFinded != null
                && vehiculoDto.NumeroMotor != null
                && await GetByNumeroMotorAsync((string)vehiculoDto.NumeroMotor)
                    is Vehiculo vehiculoExistente2
                && vehiculoExistente2.IdVehiculo != id
            )
                throw new InvalidOperationException(
                    "Ya existe un vehiculo con el numero de motor " + vehiculoDto.NumeroMotor
                ); //Manejar en el controller
            if (
                vehiculoFinded != null
                && vehiculoDto.Patente != null
                && await GetByPatenteAsync((string)vehiculoDto.Patente)
                    is Vehiculo vehiculoExistente3
                && vehiculoExistente3.IdVehiculo != id
            )
                throw new InvalidOperationException(
                    "Ya existe un vehiculo con la patente " + vehiculoDto.Patente
                ); //Manejar en el controller
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
            if (vehiculo == null)
                return false;
            _context.Vehiculos.Remove(vehiculo);
            return await _context.SaveChangesAsync() > 0;
        }

        // BAJA LOGICA VEHICULO
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var vehiculo = await _context.Vehiculos.FindAsync(id);
            if (vehiculo == null)
                return false;
            vehiculo.Estado = false;
            _context.Vehiculos.Update(vehiculo);
            return await _context.SaveChangesAsync() > 0;
        }

        // ALTA LOGICA VEHICULO
        public async Task<bool> RestoreAsync(int id)
        {
            var vehiculo = await _context.Vehiculos.FindAsync(id);
            if (vehiculo == null)
                return false;
            vehiculo.Estado = true;
            _context.Vehiculos.Update(vehiculo);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
