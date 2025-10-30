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
        public async Task<(string? ,List<Auditoria>?)> GetAllAsync()
        {
            List<Auditoria> auditorias = await _context.Auditorias.ToListAsync();
            if (auditorias.Count <= 0)
                return ("No se encontraron auditorias", null);
            return (null, auditorias); 
        }

        // AUDITORIA POR ID
        public async Task<( string?, Auditoria?)> GetByIdAsync(int id)
        {
            Auditoria? auditoria = await _context.Auditorias.FindAsync(id);
            if(auditoria == null)
                return ("No se encontro la auditoria con id: " + id, null);
            return (null, auditoria);
        }
        // NUEVA AUDITORIA
        public async Task<(string?, bool)> AddAsync(Auditoria auditoria)
        {
            await _context.Auditorias.AddAsync(auditoria);
            int result = await _context.SaveChangesAsync();
            if (result <= 0)
                return ("No se pudo agregar la auditoria", false);
            return (null, true);
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