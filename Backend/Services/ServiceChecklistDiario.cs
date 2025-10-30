using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceChecklistDiario
    {
        private readonly AppDbContext _context;

        public ServiceChecklistDiario(AppDbContext context)
        {
            _context = context;
        }

        // GET TODO CHECKLISTDIARIOS
        public async Task<List<ChecklistDiario>> GetAllAsync()
        {
            return await _context.ChecklistsDiarios.ToListAsync();
        }

        // CHECKLISTDIARIO POR ID
        public async Task<ChecklistDiario?> GetByIdAsync(int id)
        {
            return await _context.ChecklistsDiarios.FindAsync(id);
        }

        // NUEVO CHECKLISTDIARIO
        public async Task<ChecklistDiario> AddAsync(ChecklistDiario checklistDiario)
        {
            _context.ChecklistsDiarios.Add(checklistDiario);
            await _context.SaveChangesAsync();
            return checklistDiario;
        }

        // UPDATE CHECKLISTDIARIO
        public async Task<bool> UpdateAsync(ChecklistDiario checklistDiario)
        {
            _context.ChecklistsDiarios.Update(checklistDiario);
            return await _context.SaveChangesAsync() > 0;
        }

        // ELIMINAR CHECKLISTDIARIO
        public async Task<bool> DeleteAsync(int id)
        {
            var checklistDiario = await _context.ChecklistsDiarios.FindAsync(id);
            if (checklistDiario == null)
                return false;

            _context.ChecklistsDiarios.Remove(checklistDiario);
            return await _context.SaveChangesAsync() > 0;
        }

        // BAJA LOGICA CHECKLISTDIARIO
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var checklistDiario = await _context.ChecklistsDiarios.FindAsync(id);
            if (checklistDiario == null) return false;

            checklistDiario.Estado = false;
            _context.ChecklistsDiarios.Update(checklistDiario);
            return await _context.SaveChangesAsync() > 0;
        }

        // ALTA LOGICA CHECKLISTDIARIO
        public async Task<bool> RestoreAsync(int id)
        {
            var checklistDiario = await _context.ChecklistsDiarios.FindAsync(id);
            if (checklistDiario == null) return false;

            checklistDiario.Estado = true;
            _context.ChecklistsDiarios.Update(checklistDiario);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}