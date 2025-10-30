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
            try
            {
                List<Auditoria> auditorias = await _context.Auditorias.ToListAsync();
                if (auditorias.Count <= 0)
                    return ("No se encontraron auditorias", null);
                return (null, auditorias); 
            }
            catch (Exception ex)
            {
                HelperFor.ShowErrorMessageInConsole("ServiceAuditoria", "GetAllAsync", ex.Message);
                throw new Exception("Error al obtener las auditorías: " + ex.Message);
            }
        }

        // AUDITORIA POR ID
        public async Task<( string?, Auditoria?)> GetByIdAsync(int id)
        {
            try
            {
                Auditoria? auditoria = await _context.Auditorias.FindAsync(id);
                if(auditoria == null)
                    return ("No se encontro la auditoria con id: " + id, null);
                return (null, auditoria);
            }
            catch (Exception ex)
            {
                HelperFor.ShowErrorMessageInConsole("ServiceAuditoria", "GetByIdAsync", ex.Message);
                throw new Exception("Error al obtener la auditoría: " + ex.Message);
            }
        }
        // NUEVA AUDITORIA
        public async Task<(string?, bool)> AddAsync(Auditoria auditoria)
        {
            try
            {
                await _context.Auditorias.AddAsync(auditoria);
                int result = await _context.SaveChangesAsync();
                if (result <= 0)
                    return ("No se pudo agregar la auditoria", false);
                return (null, true);
            }
            catch (Exception ex)
            {
                HelperFor.ShowErrorMessageInConsole("ServiceAuditoria", "AddAsync", ex.Message);
                return ("Error al agregar la auditoria: " + ex.Message, false);
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