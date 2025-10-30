using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class ServiceNeumatico
{
    private readonly AppDbContext _context;

    public ServiceNeumatico(AppDbContext context)
    {
        _context = context;
    }

    // GET TODO NEUMATICOS
    public async Task<List<Neumatico>> GetAllAsync()
    {
        try {
            return await _context.Neumaticos.ToListAsync();
        } catch (Exception ex) {
            throw new Exception("Error al obtener los neumáticos: " + ex.Message);
            
        }
    }

    // NEUMATICO POR ID
    public async Task<Neumatico?> GetByIdAsync(int id)
    {
        try {
            return await _context.Neumaticos.FindAsync(id);
        } catch (Exception ex) {
            throw new Exception("Error al obtener el neumático: " + ex.Message);
        }
    }

    // NUEVO NEUMATICO
    public async Task<Neumatico> AddAsync(Neumatico neumatico)
    {
        try {
            _context.Neumaticos.Add(neumatico);
            await _context.SaveChangesAsync();
            return neumatico;
        } catch (Exception ex) {
            throw new Exception("Error al agregar el neumático: " + ex.Message);
        }
    }

    // UPDATE NEUMATICO
    public async Task<bool> UpdateAsync(Neumatico neumatico)
    {
        try {
            _context.Neumaticos.Update(neumatico);
            return await _context.SaveChangesAsync() > 0;
        } catch (Exception ex) {
            throw new Exception("Error al actualizar el neumático: " + ex.Message);
        }
    }

    // ELIMINAR NEUMATICO
    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var neumatico = await _context.Neumaticos.FindAsync(id);
            if (neumatico == null) return false;

            _context.Neumaticos.Remove(neumatico);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al eliminar el neumático: " + ex.Message);
        }
    }

    // BAJA LOGICA NEUMATICO
    public async Task<bool> SoftDeleteAsync(int id)
    {
        try
        {
            var neumatico = await _context.Neumaticos.FindAsync(id);
            if (neumatico == null) return false;
            neumatico.Estado = false;
            _context.Neumaticos.Update(neumatico);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al realizar la baja lógica del neumático: " + ex.Message);
        }
    }
    
    // ALTA LOGICA NEUMATICO
    public async Task<bool> RestoreAsync(int id)
    {
        try
        {
            var neumatico = await _context.Neumaticos.FindAsync(id);
            if (neumatico == null) return false;
            neumatico.Estado = true;
            _context.Neumaticos.Update(neumatico);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al realizar el alta lógica del neumático: " + ex.Message);
        }
    }
}