using Backend.Services;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/personas")]
[ApiController]
public class ControllerPersona : ControllerBase
{
    private readonly ServicePersona _servicePersona;

    public ControllerPersona(ServicePersona servicePersona)
    {
        _servicePersona = servicePersona;
    }

    // GET TODAS LAS PERSONAS
    [HttpGet]
    public async Task<IActionResult> GetAllPersonas()
    {
        var personas = await _servicePersona.GetAllAsync();
        return Ok(personas);
    }

    // GET PERSONA POR ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetPersonaById(int id)
    {
        var persona = await _servicePersona.GetByIdAsync(id);
        if (persona == null)
        {
            return NotFound();
        }
        return Ok(persona);
    }

    // POST NUEVA PERSONA
    [HttpPost]
    public async Task<IActionResult> AddPersona([FromBody] Persona persona)
    {
        var newPersona = await _servicePersona.AddAsync(persona);
        return CreatedAtAction(nameof(GetPersonaById), new { id = newPersona.IdPersona }, newPersona);
    }

    // PUT ACTUALIZAR PERSONA
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePersona(int id, [FromBody] Persona persona)
    {
        if (id != persona.IdPersona)
        {
            return BadRequest();
        }

        var updated = await _servicePersona.UpdateAsync(persona);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    // DELETE PERSONA
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePersona(int id)
    {
        var deleted = await _servicePersona.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    // BAJA LOGICA PERSONA
    [HttpPatch("baja/{id}")]
    public async Task<IActionResult> SoftDeletePersona(int id)
    {
        var softDeleted = await _servicePersona.SoftDeleteAsync(id);
        if (!softDeleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    // ALTA LOGICA PERSONA
    [HttpPatch("alta/{id}")]
    public async Task<IActionResult> RestorePersona(int id)
    {
        var restored = await _servicePersona.RestoreAsync(id);
        if (!restored)
        {
            return NotFound();
        }

        return NoContent();
    }
}