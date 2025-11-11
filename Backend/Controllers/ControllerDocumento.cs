using AutoMapper;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/documentos")]
[ApiController]
public class ControllerDocumento : ControllerBase
{
    private readonly ServiceDocumento _serviceDocumento;
    private readonly IMapper mapper;

    public ControllerDocumento(ServiceDocumento serviceDocumento, IMapper mapper)
    {
        _serviceDocumento = serviceDocumento;
        this.mapper = mapper;
    }

    // GET TODOS LOS DOCUMENTOS
    [HttpGet]
    public async Task<IActionResult> GetAllDocumentos(
        [FromQuery] int numeroPagina = 1,
        [FromQuery] int tamanoPagina = 10
    )
    {
        PagedResponse<Documento> documentos = await _serviceDocumento.GetAllAsync(
            numeroPagina,
            tamanoPagina
        );
        return Ok(documentos);
    }

    // GET DOCUMENTO POR ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetDocumentoById(int id)
    {
        var documento = await _serviceDocumento.GetByIdAsync(id);
        if (documento == null)
        {
            return NotFound();
        }
        return Ok(documento);
    }

    // POST NUEVO DOCUMENTO
    [HttpPost]
    public async Task<IActionResult> AddDocumento([FromBody] CreateDocumentoDto documentoDto)
    {
        Documento documento = mapper.Map<Documento>(documentoDto);
        var newDocumento = await _serviceDocumento.AddAsync(documento);
        return CreatedAtAction(
            nameof(GetDocumentoById),
            new { id = newDocumento.IdDocumento },
            newDocumento
        );
    }

    // PUT ACTUALIZAR DOCUMENTO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDocumento(
        int id,
        [FromBody] UpdateDocumentoDto documentoDto
    )
    {
        if (id <= 0)
        {
            return BadRequest("El id debe ser mayor a 0");
        }

        try
        {
            await _serviceDocumento.UpdateAsync(id, documentoDto);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    // DELETE DOCUMENTO
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDocumento(int id)
    {
        bool deleted = await _serviceDocumento.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound("Documento no encontrado con id: " + id);
        }
        return NoContent();
    }

    // BAJA LOGICA DOCUMENTO
    [HttpPatch("baja/{id}")]
    public async Task<IActionResult> SoftDeleteDocumento(int id)
    {
        var result = await _serviceDocumento.SoftDeleteAsync(id);
        if (!result)
        {
            return NotFound("Documento no actualizado con id: " + id);
        }
        return NoContent();
    }

    // ALTA LOGICA DOCUMENTO
    [HttpPatch("alta/{id}")]
    public async Task<IActionResult> RestoreDocumento(int id)
    {
        var result = await _serviceDocumento.RestoreAsync(id);
        if (!result)
        {
            return NotFound("Documento no actualizado con id: " + id);
        }
        return NoContent();
    }
    // HAY Q VER COMO APLICAR LO DE LOS PATHS Y LO DE ARCHIVOS ACA
}
