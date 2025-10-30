using Backend.Models;
using Microsoft.EntityFrameworkCore;

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
        try {
            return await _context.ChecklistsDiarios.ToListAsync();
        } catch (Exception ex) {
            throw new Exception("Error al obtener los checklist diarios: " + ex.Message);
            
        }
    }

    // CHECKLISTDIARIO POR ID
    public async Task<ChecklistDiario?> GetByIdAsync(int id)
    {
        try {
            return await _context.ChecklistsDiarios.FindAsync(id);
        } catch (Exception ex) {
            throw new Exception("Error al obtener el checklist diario: " + ex.Message);
        }
    }

    // NUEVO CHECKLISTDIARIO
    public async Task<ChecklistDiario> AddAsync(ChecklistDiario checklistDiario)
    {
        try {
            _context.ChecklistsDiarios.Add(checklistDiario);
            await _context.SaveChangesAsync();
            return checklistDiario;
        } catch (Exception ex) {
            throw new Exception("Error al agregar el checklist diario: " + ex.Message);
        }
    }

    // UPDATE CHECKLISTDIARIO
    public async Task<bool> UpdateAsync(ChecklistDiario checklistDiario)
    {
        try {
            _context.ChecklistsDiarios.Update(checklistDiario);
            return await _context.SaveChangesAsync() > 0;
        } catch (Exception ex) {
            throw new Exception("Error al actualizar el checklist diario: " + ex.Message);
        }
    }

    // ELIMINAR CHECKLISTDIARIO
    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var checklistDiario = await _context.ChecklistsDiarios.FindAsync(id);
            if (checklistDiario == null)
                return false;

            _context.ChecklistsDiarios.Remove(checklistDiario);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al eliminar el checklist diario: " + ex.Message);
        }
    }

    // BAJA LOGICA CHECKLISTDIARIO
    public async Task<bool> SoftDeleteAsync(int id)
    {
        try
        {
            var checklistDiario = await _context.ChecklistsDiarios.FindAsync(id);
            if (checklistDiario == null) return false;

            checklistDiario.Estado = false;
            _context.ChecklistsDiarios.Update(checklistDiario);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al dar de baja el checklist diario: " + ex.Message);
        }
    }
    
    // ALTA LOGICA CHECKLISTDIARIO
    public async Task<bool> RestoreAsync(int id)
    {
        try
        {
            var checklistDiario = await _context.ChecklistsDiarios.FindAsync(id);
            if (checklistDiario == null) return false;

            checklistDiario.Estado = true;
            _context.ChecklistsDiarios.Update(checklistDiario);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al dar de alta el checklist diario: " + ex.Message);
        }
    }
}