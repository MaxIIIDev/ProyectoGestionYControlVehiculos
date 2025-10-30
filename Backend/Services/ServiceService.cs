using Backend.Models;
using Microsoft.EntityFrameworkCore;
public class ServiceService
{
    private readonly AppDbContext _context;

    public ServiceService(AppDbContext context)
    {
        _context = context;
    }

    // GET TODO SERVICIOS
    public async Task<List<Service>> GetAllAsync()
    {
        try
        {
            return await _context.Services.ToListAsync();
        }
        catch (Exception ex)
        {
            throw new Exception("Error al obtener los servicios: " + ex.Message);

        }
    }

    // SERVICIO POR ID
    public async Task<Service?> GetByIdAsync(int id)
    {
        try
        {
            return await _context.Services.FindAsync(id);
        }
        catch (Exception ex)
        {
            throw new Exception("Error al obtener el servicio: " + ex.Message);
        }
    }
    // NUEVO SERVICIO
    public async Task<Service> AddAsync(Service service)
    {
        try
        {
            _context.Services.Add(service);
            await _context.SaveChangesAsync();
            return service;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al agregar el servicio: " + ex.Message);
        }
    }
    // UPDATE SERVICIO
    public async Task<bool> UpdateAsync(Service service)
    {
        try
        {
            _context.Services.Update(service);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al actualizar el servicio: " + ex.Message);
        }
    }
    // ELIMINAR SERVICIO
    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
                return false;

            _context.Services.Remove(service);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al eliminar el servicio: " + ex.Message);
        }
    }
    // BAJA LOGICA SERVICIO
    public async Task<bool> SoftDeleteAsync(int id)
    {
        try
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) return false;

            service.Estado = false;
            _context.Services.Update(service);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al dar de baja el servicio: " + ex.Message);
        }
    }
    // ALTA LOGICA SERVICIO
    public async Task<bool> RestoreAsync(int id)
    {
        try
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) return false;

            service.Estado = true;
            _context.Services.Update(service);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al restaurar el servicio: " + ex.Message);
        }
    }
}