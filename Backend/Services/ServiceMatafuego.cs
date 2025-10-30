using Backend.Models;
using Microsoft.EntityFrameworkCore;
namespace Backend.Services
{
public class ServiceMatafuego
{
    private readonly AppDbContext _context;

    public ServiceMatafuego(AppDbContext context)
    {
        _context = context;
    }

    // GET TODO MATAFUEGOS
    public async Task<List<Matafuego>> GetAllAsync()
    {
        try
        {
            return await _context.Matafuegos.ToListAsync();
        }
        catch (Exception ex)
        {
            throw new Exception("Error al obtener los matafuegos: " + ex.Message);

        }
    }

    // MATAFUEGO POR ID
    public async Task<Matafuego?> GetByIdAsync(int id)
    {
        try
        {
            return await _context.Matafuegos.FindAsync(id);
        }
        catch (Exception ex)
        {
            throw new Exception("Error al obtener el matafuego: " + ex.Message);
        }
    }

    // NUEVO MATAFUEGO
    public async Task<Matafuego> AddAsync(Matafuego matafuego)
    {
        try
        {
            _context.Matafuegos.Add(matafuego);
            await _context.SaveChangesAsync();
            return matafuego;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al agregar el matafuego: " + ex.Message);
        }
    }

    // UPDATE MATAFUEGO
    public async Task<bool> UpdateAsync(Matafuego matafuego)
    {
        try
        {
            _context.Matafuegos.Update(matafuego);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al actualizar el matafuego: " + ex.Message);
        }
    }

    // ELIMINAR MATAFUEGO
    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var matafuego = await _context.Matafuegos.FindAsync(id);
            if (matafuego == null) return false;

            _context.Matafuegos.Remove(matafuego);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al eliminar el matafuego: " + ex.Message);
        }
    }

    // BAJA LOGICA MATAFUEGO
    public async Task<bool> SoftDeleteAsync(int id)
    {
        try
        {
            var matafuego = await _context.Matafuegos.FindAsync(id);
            if (matafuego == null) return false;

            matafuego.Estado = false;
            _context.Matafuegos.Update(matafuego);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al realizar la baja lógica del matafuego: " + ex.Message);
        }
    }

    // ALTA LOGICA MATAFUEGO
    public async Task<bool> RestoreAsync(int id)
    {
        try
        {
            var matafuego = await _context.Matafuegos.FindAsync(id);
            if (matafuego == null) return false;

            matafuego.Estado = true;
            _context.Matafuegos.Update(matafuego);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al realizar la alta lógica del matafuego: " + ex.Message);
        }
    }
}
}