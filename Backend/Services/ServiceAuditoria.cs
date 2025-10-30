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
        public async Task<List<Auditoria>> GetAllAsync()
        {
            return await _context.Auditorias.ToListAsync();
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
        public async Task<bool> UpdateAsync(Auditoria auditoria)
        {
            _context.Auditorias.Update(auditoria);
            return await _context.SaveChangesAsync() > 0;
        }

        // ELIMINAR AUDITORIA
        public async Task<bool> DeleteAsync(int id)
        {
            var auditoria = await _context.Auditorias.FindAsync(id);
            if (auditoria == null)
                return false;

            _context.Auditorias.Remove(auditoria);
            return await _context.SaveChangesAsync() > 0;
        }


    }

    // FALTA HACER EL SERVICIO Q REVISA ENTITY NAME Y SU ID PARA TRAERLO SEGUN NECESARIO
}