using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceRegistroKilometraje
    {
        private readonly AppDbContext _context;

        public ServiceRegistroKilometraje(AppDbContext context)
        {
            _context = context;
        }

        // GET TODO REGISTROS KILOMETRAJE
        public async Task<List<RegistroKilometraje>> GetAllAsync()
        {
            try
            {
                return await _context.RegistrosKilometraje.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener los registros de kilometraje: " + ex.Message);

            }
        }

        // REGISTRO KILOMETRAJE POR ID
        public async Task<RegistroKilometraje?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.RegistrosKilometraje.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el registro de kilometraje: " + ex.Message);
            }
        }
        // NUEVO REGISTRO KILOMETRAJE
        public async Task<RegistroKilometraje> AddAsync(RegistroKilometraje registroKilometraje)
        {
            try
            {
                _context.RegistrosKilometraje.Add(registroKilometraje);
                await _context.SaveChangesAsync();
                return registroKilometraje;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar el registro de kilometraje: " + ex.Message);
            }
        }
        // UPDATE REGISTRO KILOMETRAJE
        public async Task<bool> UpdateAsync(RegistroKilometraje registroKilometraje)
        {
            try
            {
                _context.RegistrosKilometraje.Update(registroKilometraje);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar el registro de kilometraje: " + ex.Message);
            }
        }
        // ELIMINAR REGISTRO KILOMETRAJE
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var registroKilometraje = await _context.RegistrosKilometraje.FindAsync(id);
                if (registroKilometraje == null)
                    return false;

                _context.RegistrosKilometraje.Remove(registroKilometraje);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el registro de kilometraje: " + ex.Message);
            }
        }

        // BAJA LOGICA REGISTRO KILOMETRAJE
        public async Task<bool> SoftDeleteAsync(int id)
        {
            try
            {
                var registroKilometraje = await _context.RegistrosKilometraje.FindAsync(id);
                if (registroKilometraje == null)
                    return false;

                registroKilometraje.Estado = false;
                _context.RegistrosKilometraje.Update(registroKilometraje);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al dar de baja el registro de kilometraje: " + ex.Message);
            }
        }
        // ALTA LOGICA REGISTRO KILOMETRAJE
        public async Task<bool> RestoreAsync(int id)
        {
            try
            {
                var registroKilometraje = await _context.RegistrosKilometraje.FindAsync(id);
                if (registroKilometraje == null)
                    return false;

                registroKilometraje.Estado = true;
                _context.RegistrosKilometraje.Update(registroKilometraje);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al restaurar el registro de kilometraje: " + ex.Message);
            }
        }
    }
}