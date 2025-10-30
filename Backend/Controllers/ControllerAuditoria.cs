using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/auditorias")]
[ApiController]

public class ControllerAuditoria : ControllerBase
{
    private readonly ServiceAuditoria _serviceAuditoria;

    public ControllerAuditoria(ServiceAuditoria serviceAuditoria)
    {
        _serviceAuditoria = serviceAuditoria;
    }

    // GET TODAS LAS AUDITORIAS
    [HttpGet]
    public async Task<IActionResult> GetAllAuditorias([FromQuery] int numeroPagina = 1, [FromQuery] int tamanoPagina = 10)
    {
        PagedResponse<Auditoria>? auditorias = await _serviceAuditoria.GetAllAsync(numeroPagina, tamanoPagina);
        return Ok(auditorias);
    }

    // GET AUDITORIA POR ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetAuditoriaById(int id)
    {
        var auditoria = await _serviceAuditoria.GetByIdAsync(id);
        if (auditoria == null)
        {
            return NotFound();
        }
        return Ok(auditoria);
    }
    // POST NUEVA AUDITORIA
    [HttpPost]
    public async Task<IActionResult> AddAuditoria([FromBody] Auditoria auditoria)
    {
        var newAuditoria = await _serviceAuditoria.AddAsync(auditoria);
        return CreatedAtAction(nameof(GetAuditoriaById), new { id = newAuditoria.IdAuditoria }, newAuditoria);
    }
    // PUT ACTUALIZAR AUDITORIA
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAuditoria(int id, [FromBody] Auditoria auditoria)
    {
        if (id != auditoria.IdAuditoria)
        {
            return BadRequest();
        }

        var updated = await _serviceAuditoria.UpdateAsync(auditoria);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }
    // DELETE AUDITORIA
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAuditoria(int id)
    {
        var deleted = await _serviceAuditoria.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }

    //FALTA HACER EL CONTROLLER QUE USA EL SERVICIO Q REVISA ENTITY NAME Y SU ID PARA TRAERLO SEGUN NECESARIO
}