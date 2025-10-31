using AutoMapper;
using Backend.Services;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/personas")]
[ApiController]
public class ControllerPersona : ControllerBase
{
    private readonly ServicePersona _servicePersona;
    private readonly IMapper mapper;

    public ControllerPersona(ServicePersona servicePersona, IMapper mapper)
    {
        _servicePersona = servicePersona;
        this.mapper = mapper;
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
    public async Task<IActionResult> AddPersona([FromBody] CreatePersonaDto personaDto)
    { 
        Persona persona = mapper.Map<Persona>(personaDto);
        var newPersona = await _servicePersona.AddAsync(persona);
        return CreatedAtAction(nameof(GetPersonaById), new { id = newPersona.IdPersona }, newPersona);
    }

    // PUT ACTUALIZAR PERSONA
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePersona(int id, [FromBody] UpdatePersonaDto personaDto)
    {
        if (id <= 0)
        {
            return BadRequest("El id debe ser mayor a 0");
        }
        Persona persona = mapper.Map<Persona>(personaDto);
        persona.IdPersona = id;

        try
        {
            await _servicePersona.UpdateAsync(persona);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        
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