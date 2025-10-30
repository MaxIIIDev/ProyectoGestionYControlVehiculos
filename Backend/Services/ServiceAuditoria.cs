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
            try
            {
                return await _context.Auditorias.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las auditorías: " + ex.Message);

            }
        }

        // AUDITORIA POR ID
        public async Task<Auditoria?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Auditorias.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la auditoría: " + ex.Message);
            }
        }
        // NUEVA AUDITORIA
        public async Task<Auditoria> AddAsync(Auditoria auditoria)
        {
            try
            {
                _context.Auditorias.Add(auditoria);
                await _context.SaveChangesAsync();
                return auditoria;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar la auditoría: " + ex.Message);
            }
        }

        // UPDATE AUDITORIA
        public async Task<bool> UpdateAsync(Auditoria auditoria)
        {
            try
            {
                _context.Auditorias.Update(auditoria);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar la auditoría: " + ex.Message);
            }
        }

        // ELIMINAR AUDITORIA
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var auditoria = await _context.Auditorias.FindAsync(id);
                if (auditoria == null)
                    return false;

                _context.Auditorias.Remove(auditoria);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar la auditoría: " + ex.Message);
            }
        }


    }

    // FALTA HACER EL SERVICIO Q REVISA ENTITY NAME Y SU ID PARA TRAERLO SEGUN NECESARIO
}