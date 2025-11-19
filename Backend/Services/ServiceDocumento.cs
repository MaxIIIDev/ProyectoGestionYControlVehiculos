using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceDocumento
    {
        private readonly AppDbContext _context;
        private readonly ServiceVehiculo _serviceVehiculo;
        private readonly IMapper mapper;

        public ServiceDocumento(
            AppDbContext context,
            IMapper mapper,
            ServiceVehiculo serviceVehiculo
        )
        {
            _context = context;
            this.mapper = mapper;
            _serviceVehiculo = serviceVehiculo;
        }

        // GET TODO DOCUMENTOS
        public async Task<PagedResponse<Documento>> GetAllAsync(int nroPagina, int tamanoPagina)
        {
            IQueryable<Documento> query = _context.Documentos;
            int totalRegistrosDocumento = await query.CountAsync();
            List<Documento>? documentos = await query
                .OrderBy(d => d.IdDocumento)
                .Skip((nroPagina - 1) * tamanoPagina)
                .Take(tamanoPagina)
                .ToListAsync();
            return new PagedResponse<Documento>(
                documentos,
                totalRegistrosDocumento,
                nroPagina,
                tamanoPagina
            );
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
        public async Task UpdateAsync(int id, UpdateDocumentoDto documento)
        {
            Documento? docFinded = await this.GetByIdAsync(id);
            if (docFinded == null)
                throw new KeyNotFoundException("Documento con id " + id + " no encontrada");
            if (
                docFinded.IdVehiculo != documento.IdVehiculo
                && await _serviceVehiculo.GetByIdAsync(documento.IdVehiculo) is null
            )
                throw new KeyNotFoundException(
                    "Vehiculo con id " + documento.IdVehiculo + " no encontrado"
                );
            mapper.Map(documento, docFinded);
            System.Console.WriteLine(docFinded.IdDocumento);
            await _context.SaveChangesAsync();
        }

        // ELIMINAR DOCUMENTO
        public async Task<bool> DeleteAsync(int id)
        {
            var documento = await _context.Documentos.FindAsync(id);
            if (documento == null)
                return false;

            _context.Documentos.Remove(documento);
            return await _context.SaveChangesAsync() > 0;
        }

        // BAJA LOGICA DOCUMENTO
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var documento = await _context.Documentos.FindAsync(id);
            if (documento == null)
                return false;

            documento.Estado = false;
            _context.Documentos.Update(documento);
            return await _context.SaveChangesAsync() > 0;
        }

        // ALTA LOGICA DOCUMENTO
        public async Task<bool> RestoreAsync(int id)
        {
            var documento = await _context.Documentos.FindAsync(id);
            if (documento == null)
                return false;

            documento.Estado = true;
            _context.Documentos.Update(documento);
            return await _context.SaveChangesAsync() > 0;
        }

        // GET DOCUMENTOS POR VEHICULO ID
        public async Task<List<Documento>> GetByVehiculoIdAsync(int IdVehiculo)
        {
            return await _context.Documentos.Where(d => d.IdVehiculo == IdVehiculo).ToListAsync();
        }
    }

    // AL DE CREACION HAY Q COLOCARLE LA LOGICA DE CREACION DE CARPETAS Y RENOMBRAMIENTO DE ARCHIVOS Y LA CREACION DEL URLPATH
}
