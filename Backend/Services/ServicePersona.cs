using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServicePersona
    {
        private readonly AppDbContext _context;

        public ServicePersona(AppDbContext context)
        {
            _context = context;
        }

        // GET TODO PERSONAS
        public async Task<List<Persona>> GetAllAsync()
        {
            try
            {
                return await _context.Personas.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las personas: " + ex.Message);

            }
        }

        // PERSONA POR ID
        public async Task<Persona?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Personas.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la persona: " + ex.Message);
            }
        }

        // NUEVA PERSONA
        public async Task<Persona> AddAsync(Persona persona)
        {
            try
            {
                _context.Personas.Add(persona);
                await _context.SaveChangesAsync();
                return persona;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar la persona: " + ex.Message);
            }
        }

        // UPDATE PERSONA
        public async Task<bool> UpdateAsync(Persona persona)
        {
            try
            {
                _context.Personas.Update(persona);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar la persona: " + ex.Message);
            }
        }

        // ELIMINAR PERSONA
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var persona = await _context.Personas.FindAsync(id);
                if (persona == null) return false;

                _context.Personas.Remove(persona);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar la persona: " + ex.Message);
            }
        }

        // BAJA LOGICA PERSONA
        public async Task<bool> SoftDeleteAsync(int id)
        {
            try
            {
                var persona = await _context.Personas.FindAsync(id);
                if (persona == null) return false;
                persona.Estado = false;
                _context.Personas.Update(persona);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al dar de baja la persona: " + ex.Message);
            }
        }

        // ALTA LOGICA PERSONA
        public async Task<bool> RestoreAsync(int id)
        {
            try
            {
                var persona = await _context.Personas.FindAsync(id);
                if (persona == null) return false;
                persona.Estado = true;
                _context.Personas.Update(persona);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al dar de alta la persona: " + ex.Message);
            }
        }
    }
}