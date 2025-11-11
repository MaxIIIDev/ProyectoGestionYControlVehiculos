using AutoMapper;
using Backend.Models;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceRegistroKilometraje
    {
        private readonly AppDbContext _context;
        private readonly ServiceVehiculo _serviceVehiculo;
        private readonly IMapper mapper;

        public ServiceRegistroKilometraje(
            AppDbContext context,
            IMapper mapper,
            ServiceVehiculo serviceVehiculo
        )
        {
            _context = context;
            this.mapper = mapper;
            _serviceVehiculo = serviceVehiculo;
        }

        // GET TODO REGISTROS KILOMETRAJE
        public async Task<PagedResponse<RegistroKilometraje>> GetAllAsync(
            int nroPagina,
            int tamanoPagina
        )
        {
            IQueryable<RegistroKilometraje> query = _context.RegistrosKilometraje;
            int totalRegistrosRegistroKilometraje = await query.CountAsync();
            List<RegistroKilometraje>? registrosKilometraje = await query
                .OrderBy(r => r.IdRegistroKilometraje)
                .Skip((nroPagina - 1) * tamanoPagina)
                .Take(tamanoPagina)
                .ToListAsync();
            return new PagedResponse<RegistroKilometraje>(
                registrosKilometraje,
                totalRegistrosRegistroKilometraje,
                nroPagina,
                tamanoPagina
            );
        }

        // REGISTRO KILOMETRAJE POR ID
        public async Task<RegistroKilometraje?> GetByIdAsync(int id)
        {
            return await _context.RegistrosKilometraje.FindAsync(id);
        }

        // NUEVO REGISTRO KILOMETRAJE
        public async Task<RegistroKilometraje> AddAsync(RegistroKilometraje registroKilometraje)
        {
            if (await _serviceVehiculo.GetByIdAsync(registroKilometraje.IdVehiculo) is null)
                throw new KeyNotFoundException(
                    "Vehiculo con id " + registroKilometraje.IdVehiculo + " no encontrado"
                );
            _context.RegistrosKilometraje.Add(registroKilometraje);
            await _context.SaveChangesAsync();
            return registroKilometraje;
        }

        // UPDATE REGISTRO KILOMETRAJE
        public async Task UpdateAsync(int id, UpdateRegistroKilometrajeDto registroKilometrajeDto)
        {
            RegistroKilometraje? registroFinded = await _context.RegistrosKilometraje.FindAsync(id);
            if (registroFinded == null)
                throw new KeyNotFoundException(
                    "Registro Kilometraje con id " + id + " no encontrado"
                );
            if (
                registroFinded.IdVehiculo != registroKilometrajeDto.IdVehiculo
                && await _serviceVehiculo.GetByIdAsync(registroKilometrajeDto.IdVehiculo) is null
            )
                throw new KeyNotFoundException(
                    "Vehiculo con id " + registroKilometrajeDto.IdVehiculo + " no encontrado"
                );
            mapper.Map(registroKilometrajeDto, registroFinded);
            await _context.SaveChangesAsync();
        }

        // ELIMINAR REGISTRO KILOMETRAJE
        public async Task<bool> DeleteAsync(int id)
        {
            var registroKilometraje = await _context.RegistrosKilometraje.FindAsync(id);
            if (registroKilometraje == null)
                return false;

            _context.RegistrosKilometraje.Remove(registroKilometraje);
            return await _context.SaveChangesAsync() > 0;
        }

        // BAJA LOGICA REGISTRO KILOMETRAJE
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var registroKilometraje = await _context.RegistrosKilometraje.FindAsync(id);
            if (registroKilometraje == null)
                return false;

            registroKilometraje.Estado = false;
            _context.RegistrosKilometraje.Update(registroKilometraje);
            return await _context.SaveChangesAsync() > 0;
        }

        // ALTA LOGICA REGISTRO KILOMETRAJE
        public async Task<bool> RestoreAsync(int id)
        {
            var registroKilometraje = await _context.RegistrosKilometraje.FindAsync(id);
            if (registroKilometraje == null)
                return false;

            registroKilometraje.Estado = true;
            _context.RegistrosKilometraje.Update(registroKilometraje);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
