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
        public async Task<PagedResponse<Persona>> GetAllAsync(int nroPagina, int tamanoPagina)
        {
            IQueryable<Persona> query = _context.Personas;
            int totalRegistrosPersona = await query.CountAsync();
            List<Persona>? personas = await query
                .OrderBy(p => p.IdPersona)
                .Skip((nroPagina - 1) * tamanoPagina)
                .Take(tamanoPagina)
                .ToListAsync();
            return new PagedResponse<Persona>(
                personas,
                totalRegistrosPersona,
                nroPagina,
                tamanoPagina
            );
        }

        // PERSONA POR ID
        public async Task<Persona?> GetByIdAsync(int id)
        {
            return await _context.Personas.FindAsync(id);
        }

        // PERSONA POR DNI
        public async Task<Persona?> GetByDniAsync(int dni)
        {
            return await _context.Personas.FirstOrDefaultAsync(p => p.Dni == dni);
        }

        // NUEVA PERSONA
        public async Task<Persona> AddAsync(Persona persona)
        {
            if (await GetByDniAsync(persona.Dni) != null)
                throw new InvalidOperationException(
                    "Ya existe una persona con el DNI " + persona.Dni
                ); //Al controller
            _context.Personas.Add(persona);
            await _context.SaveChangesAsync();
            return persona;
        }

        // UPDATE PERSONA
        public async Task UpdateAsync(int id, UpdatePersonaDto persDto)
        {
            Persona? persFinded = await _context.Personas.FindAsync(id);
            if (
                persFinded != null
                && persDto.Dni != null
                && await GetByDniAsync((int)persDto.Dni) is Persona persExistente
                && persExistente.IdPersona != id
            )
                throw new InvalidOperationException(
                    "Ya existe una persona con el DNI " + persDto.Dni
                ); //Al controller
            if (persFinded == null)
                throw new KeyNotFoundException("Persona con id " + id + " no encontrada");
            mapper.Map(persDto, persFinded);
            await _context.SaveChangesAsync();
        }

        // ELIMINAR PERSONA
        public async Task<bool> DeleteAsync(int id)
        {
            var persona = await _context.Personas.FindAsync(id);
            if (persona == null)
                return false;

            _context.Personas.Remove(persona);
            return await _context.SaveChangesAsync() > 0;
        }

        // BAJA LOGICA PERSONA
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var persona = await _context.Personas.FindAsync(id);
            if (persona == null)
                return false;
            persona.Estado = false;
            _context.Personas.Update(persona);
            return await _context.SaveChangesAsync() > 0;
        }

        // ALTA LOGICA PERSONA
        public async Task<bool> RestoreAsync(int id)
        {
            var persona = await _context.Personas.FindAsync(id);
            if (persona == null)
                return false;
            persona.Estado = true;
            _context.Personas.Update(persona);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
