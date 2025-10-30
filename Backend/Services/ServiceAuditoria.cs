using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceAuditoria
    {
        private readonly AppDbContext _context;

        public ServiceAuditoria(AppDbContext context)
        {
            _context = context;
        }

        // GET TODO AUDITORIAS
        public async Task<PagedResponse<Auditoria>> GetAllAsync(int numeroPagina, int tamanoPagina)
        {
            IQueryable<Auditoria> query = _context.Auditorias;
            int totalRegistrosAuditoria = await query.CountAsync();
            var auditorias = await query
                            .OrderBy(a => a.IdAuditoria)
                            .Skip((numeroPagina - 1) * tamanoPagina)
                            .Take(tamanoPagina)
                            .ToListAsync();
            return new PagedResponse<Auditoria>(auditorias, totalRegistrosAuditoria, numeroPagina, tamanoPagina);
        }

        // AUDITORIA POR ID
        public async Task<Auditoria?> GetByIdAsync(int id)
        {
            return await _context.Auditorias.FindAsync(id);
        }
        // NUEVA AUDITORIA
        public async Task<Auditoria> AddAsync(Auditoria auditoria)
        {
            _context.Auditorias.Add(auditoria);
            await _context.SaveChangesAsync();
            return auditoria;
        }

        // UPDATE AUDITORIA
        public async Task UpdateAsync(Auditoria auditoria)
        {
            if( await this.GetByIdAsync(auditoria.IdAuditoria) == null)
            {
                throw new KeyNotFoundException("Auditoria con id " + auditoria.IdAuditoria + " no encontrada");
            }
            _context.Auditorias.Update(auditoria);
            await _context.SaveChangesAsync();
        }

        // ELIMINAR AUDITORIA
        public async Task DeleteAsync(int id)
        {
            Auditoria? auditoria = await _context.Auditorias.FindAsync(id);
            if (auditoria == null)
                throw new KeyNotFoundException("Auditoria con id " + id + " no encontrada");

            _context.Auditorias.Remove(auditoria);
            await _context.SaveChangesAsync();
        }


    }

    // FALTA HACER EL SERVICIO Q REVISA ENTITY NAME Y SU ID PARA TRAERLO SEGUN NECESARIO
}