using Backend.Models;
using Microsoft.EntityFrameworkCore;
namespace Backend.Services
{
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
            return await _context.Services.ToListAsync();
        }

        // SERVICIO POR ID
        public async Task<Service?> GetByIdAsync(int id)
        {
            return await _context.Services.FindAsync(id);
        }
        // NUEVO SERVICIO
        public async Task<Service> AddAsync(Service service)
        {
            _context.Services.Add(service);
            await _context.SaveChangesAsync();
            return service;
        }
        // UPDATE SERVICIO
        public async Task<bool> UpdateAsync(Service service)
        {
            _context.Services.Update(service);
            return await _context.SaveChangesAsync() > 0;
        }
        // ELIMINAR SERVICIO
        public async Task<bool> DeleteAsync(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
                return false;

            _context.Services.Remove(service);
            return await _context.SaveChangesAsync() > 0;
        }
        // BAJA LOGICA SERVICIO
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) return false;

            service.Estado = false;
            _context.Services.Update(service);
            return await _context.SaveChangesAsync() > 0;
        }
        // ALTA LOGICA SERVICIO
        public async Task<bool> RestoreAsync(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) return false;

            service.Estado = true;
            _context.Services.Update(service);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}