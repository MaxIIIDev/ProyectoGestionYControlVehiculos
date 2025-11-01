
using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceRegistroKilometraje
    {
        private readonly AppDbContext _context;
        private readonly IMapper mapper;

        public ServiceRegistroKilometraje(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        // GET TODO REGISTROS KILOMETRAJE
        public async Task<List<RegistroKilometraje>> GetAllAsync()
        {
            return await _context.RegistrosKilometraje.ToListAsync();
        }

        // REGISTRO KILOMETRAJE POR ID
        public async Task<RegistroKilometraje?> GetByIdAsync(int id)
        {
            return await _context.RegistrosKilometraje.FindAsync(id);
        }
        // NUEVO REGISTRO KILOMETRAJE
        public async Task<RegistroKilometraje> AddAsync(RegistroKilometraje registroKilometraje)
        {
            _context.RegistrosKilometraje.Add(registroKilometraje);
            await _context.SaveChangesAsync();
            return registroKilometraje;
        }
        // UPDATE REGISTRO KILOMETRAJE
        public async Task UpdateAsync(int id, UpdateRegistroKilometrajeDto registroKilometrajeDto)
        {
            RegistroKilometraje? registroFinded = await _context.RegistrosKilometraje.FindAsync(id);
            if (registroFinded == null)
                throw new KeyNotFoundException("Registro Kilometraje con id " + id + " no encontrado");
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