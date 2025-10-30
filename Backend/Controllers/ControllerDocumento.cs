using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/documentos")]
[ApiController]

public class ControllerDocumento : ControllerBase
{
    private readonly ServiceDocumento _serviceDocumento;

    public ControllerDocumento(ServiceDocumento serviceDocumento)
    {
        _serviceDocumento = serviceDocumento;
    }

    // GET TODOS LOS DOCUMENTOS
    [HttpGet]
    public async Task<IActionResult> GetAllDocumentos()
    {
        var documentos = await _serviceDocumento.GetAllAsync();
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
    public async Task<IActionResult> AddDocumento([FromBody] Documento documento)
    {
        var newDocumento = await _serviceDocumento.AddAsync(documento);
        return CreatedAtAction(nameof(GetDocumentoById), new { id = newDocumento.IdDocumento }, newDocumento);
    }

    // PUT ACTUALIZAR DOCUMENTO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDocumento(int id, [FromBody] Documento documento)
    {
        if (id != documento.IdDocumento)
        {
            return BadRequest();
        }

        var updated = await _serviceDocumento.UpdateAsync(documento);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }
    // DELETE DOCUMENTO
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDocumento(int id)
    {
        var deleted = await _serviceDocumento.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
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
            return NotFound();
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
            return NotFound();
        }
        return NoContent();
    }
// HAY Q VER COMO APLICAR LO DE LOS PATHS Y LO DE ARCHIVOS ACA
}