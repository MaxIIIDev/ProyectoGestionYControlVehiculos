using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServicePersona
    {
        private readonly AppDbContext _context;
        private readonly IMapper mapper;

        public ServicePersona(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        // GET TODO PERSONAS
        public async Task<List<Persona>> GetAllAsync()
        {
            return await _context.Personas.ToListAsync();
        }

        // PERSONA POR ID
        public async Task<Persona?> GetByIdAsync(int id)
        {
            return await _context.Personas.FindAsync(id);
        }

        // NUEVA PERSONA
        public async Task<Persona> AddAsync(Persona persona)
        {
            _context.Personas.Add(persona);
            await _context.SaveChangesAsync();
            return persona;
        }

        // UPDATE PERSONA
        public async Task UpdateAsync(Persona persona)
        {
            Persona? persFinded = await this.GetByIdAsync(persona.IdPersona);
            if( persFinded == null)
                throw new KeyNotFoundException("Persona con id " + persona.IdPersona + " no encontrada");
            mapper.Map(persona, persFinded);
            await _context.SaveChangesAsync();
        }

        // ELIMINAR PERSONA
        public async Task<bool> DeleteAsync(int id)
        {
            var persona = await _context.Personas.FindAsync(id);
            if (persona == null) return false;

            _context.Personas.Remove(persona);
            return await _context.SaveChangesAsync() > 0;
        }

        // BAJA LOGICA PERSONA
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var persona = await _context.Personas.FindAsync(id);
            if (persona == null) return false;
            persona.Estado = false;
            _context.Personas.Update(persona);
            return await _context.SaveChangesAsync() > 0;
        }

        // ALTA LOGICA PERSONA
        public async Task<bool> RestoreAsync(int id)
        {
            var persona = await _context.Personas.FindAsync(id);
            if (persona == null) return false;
            persona.Estado = true;
            _context.Personas.Update(persona);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}