using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class DocumentoService
{
    private readonly AppDbContext _context;

    public DocumentoService(AppDbContext context)
    {
        _context = context;
    }

    // GET TODO DOCUMENTOS
    public async Task<List<Documento>> GetAllAsync()
    {
        try {
            return await _context.Documentos.ToListAsync();
        } catch (Exception ex) {
            throw new Exception("Error al obtener los documentos: " + ex.Message);
            
        }
    }

    // DOCUMENTO POR ID
    public async Task<Documento?> GetByIdAsync(int id)
    {
        try {
            return await _context.Documentos.FindAsync(id);
        } catch (Exception ex) {
            throw new Exception("Error al obtener el documento: " + ex.Message);
        }
    }

    // NUEVO DOCUMENTO
    public async Task<Documento> AddAsync(Documento documento)
    {
        try {
            _context.Documentos.Add(documento);
            await _context.SaveChangesAsync();
            return documento;
        } catch (Exception ex) {
            throw new Exception("Error al agregar el documento: " + ex.Message);
        }
    }

    // UPDATE DOCUMENTO
    public async Task<bool> UpdateAsync(Documento documento)
    {
        try {
            _context.Documentos.Update(documento);
            return await _context.SaveChangesAsync() > 0;
        } catch (Exception ex) {
            throw new Exception("Error al actualizar el documento: " + ex.Message);
        }
    }

    // ELIMINAR DOCUMENTO
    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var documento = await _context.Documentos.FindAsync(id);
            if (documento == null) return false;

            _context.Documentos.Remove(documento);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al eliminar el documento: " + ex.Message);
        }
    }

    // BAJA LOGICA DOCUMENTO
    public async Task<bool> SoftDeleteAsync(int id)
    {
        try
        {
            var documento = await _context.Documentos.FindAsync(id);
            if (documento == null) return false;

            documento.Estado = false;
            _context.Documentos.Update(documento);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al realizar la baja lógica del documento: " + ex.Message);
        }
    }
    
    // ALTA LOGICA DOCUMENTO
    public async Task<bool> RestoreAsync(int id)
    {
        try
        {
            var documento = await _context.Documentos.FindAsync(id);
            if (documento == null) return false;

            documento.Estado = true;
            _context.Documentos.Update(documento);
            return await _context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al realizar la alta lógica del documento: " + ex.Message);
        }
    }
}