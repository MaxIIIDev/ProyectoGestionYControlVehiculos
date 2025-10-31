using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceDocumento
    {
        private readonly AppDbContext _context;
        private readonly IMapper mapper;
        public ServiceDocumento(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        // GET TODO DOCUMENTOS
        public async Task<List<Documento>> GetAllAsync()
        {
            return await _context.Documentos.ToListAsync();
        }

        // DOCUMENTO POR ID
        public async Task<Documento?> GetByIdAsync(int id)
        {
            return await _context.Documentos.FindAsync(id);
        }

        // NUEVO DOCUMENTO
        public async Task<Documento> AddAsync(Documento documento)
        {
            _context.Documentos.Add(documento);
            await _context.SaveChangesAsync();
            return documento;
        }

        // UPDATE DOCUMENTO
        public async Task UpdateAsync(int id,UpdateDocumentoDto documento)
        {
            Documento? docFinded = await this.GetByIdAsync(id);
            if( docFinded == null)
                throw new KeyNotFoundException("Documento con id " + id + " no encontrada");
            mapper.Map(documento, docFinded);
            System.Console.WriteLine(docFinded.IdDocumento);
            await _context.SaveChangesAsync();
        }

        // ELIMINAR DOCUMENTO
        public async Task<bool> DeleteAsync(int id)
        {
            var documento = await _context.Documentos.FindAsync(id);
            if (documento == null) return false;

            _context.Documentos.Remove(documento);
            return await _context.SaveChangesAsync() > 0;
        }

        // BAJA LOGICA DOCUMENTO
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var documento = await _context.Documentos.FindAsync(id);
            if (documento == null) return false;

            documento.Estado = false;
            _context.Documentos.Update(documento);
            return await _context.SaveChangesAsync() > 0;
        }

        // ALTA LOGICA DOCUMENTO
        public async Task<bool> RestoreAsync(int id)
        {
            var documento = await _context.Documentos.FindAsync(id);
            if (documento == null) return false;

            documento.Estado = true;
            _context.Documentos.Update(documento);
            return await _context.SaveChangesAsync() > 0;
        }
    }

    // AL DE CREACION HAY Q COLOCARLE LA LOGICA DE CREACION DE CARPETAS Y RENOMBRAMIENTO DE ARCHIVOS Y LA CREACION DEL URLPATH
}