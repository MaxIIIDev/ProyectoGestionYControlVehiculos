using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceNeumatico
    {
        private readonly AppDbContext _context;
        private readonly IMapper mapper;

        public ServiceNeumatico(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        // GET TODO NEUMATICOS
        public async Task<PagedResponse<Neumatico>> GetAllAsync(int nroPagina, int tamanoPagina)
        {
            IQueryable<Neumatico> query = _context.Neumaticos;
            int totalRegistrosNeumatico = await query.CountAsync();
            List<Neumatico>? neumaticos = await query
                .OrderBy(n => n.IdNeumatico)
                .Skip((nroPagina - 1) * tamanoPagina)
                .Take(tamanoPagina)
                .ToListAsync();
            return new PagedResponse<Neumatico>(
                neumaticos,
                totalRegistrosNeumatico,
                nroPagina,
                tamanoPagina
            );
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
        public async Task UpdateAsync(int id, UpdateNeumaticoDto neumaticoDto)
        {
            Neumatico? neumaticoFinded = await _context.Neumaticos.FindAsync(id);
            if (neumaticoFinded == null)
                throw new KeyNotFoundException("Neumatico con id " + id + " no encontrado");
            mapper.Map(neumaticoDto, neumaticoFinded);
            _context.Neumaticos.Update(neumaticoFinded);
            await _context.SaveChangesAsync();
        }

        // ELIMINAR NEUMATICO
        public async Task<bool> DeleteAsync(int id)
        {
            var neumatico = await _context.Neumaticos.FindAsync(id);
            if (neumatico == null)
                return false;

            _context.Neumaticos.Remove(neumatico);
            return await _context.SaveChangesAsync() > 0;
        }

        // BAJA LOGICA NEUMATICO
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var neumatico = await _context.Neumaticos.FindAsync(id);
            if (neumatico == null)
                return false;
            neumatico.Estado = false;
            _context.Neumaticos.Update(neumatico);
            return await _context.SaveChangesAsync() > 0;
        }

        // ALTA LOGICA NEUMATICO
        public async Task<bool> RestoreAsync(int id)
        {
            var neumatico = await _context.Neumaticos.FindAsync(id);
            if (neumatico == null)
                return false;
            neumatico.Estado = true;
            _context.Neumaticos.Update(neumatico);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
