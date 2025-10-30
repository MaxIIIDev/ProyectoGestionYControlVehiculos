using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/registro-kilometraje")]
[ApiController]

public class ControllerRegistroKilometraje : ControllerBase
{
    private readonly ServiceRegistroKilometraje _serviceRegistroKilometraje;

    public ControllerRegistroKilometraje(ServiceRegistroKilometraje serviceRegistroKilometraje)
    {
        _serviceRegistroKilometraje = serviceRegistroKilometraje;
    }

    // GET TODO REGISTROS KILOMETRAJE
    [HttpGet]
    public async Task<IActionResult> GetAllRegistrosKilometraje()
    {
        var registros = await _serviceRegistroKilometraje.GetAllAsync();
        return Ok(registros);
    }
    // GET REGISTRO KILOMETRAJE POR ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRegistroKilometrajeById(int id)
    {
        var registro = await _serviceRegistroKilometraje.GetByIdAsync(id);
        if (registro == null)
        {
            return NotFound();
        }
        return Ok(registro);
    }
    // POST NUEVO REGISTRO KILOMETRAJE
    [HttpPost]
    public async Task<IActionResult> AddRegistroKilometraje([FromBody] RegistroKilometraje registroKilometraje)
    {
        var newRegistro = await _serviceRegistroKilometraje.AddAsync(registroKilometraje);
        return CreatedAtAction(nameof(GetRegistroKilometrajeById), new { id = newRegistro.IdRegistroKilometraje }, newRegistro);
    }
    // PUT ACTUALIZAR REGISTRO KILOMETRAJE
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRegistroKilometraje(int id, [FromBody] RegistroKilometraje registroKilometraje)
    {
        if (id != registroKilometraje.IdRegistroKilometraje)
        {
            return BadRequest();
        }

        var updated = await _serviceRegistroKilometraje.UpdateAsync(registroKilometraje);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }
    // DELETE REGISTRO KILOMETRAJE
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRegistroKilometraje(int id)
    {
        var deleted = await _serviceRegistroKilometraje.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
    // BAJA LOGICA REGISTRO KILOMETRAJE
    [HttpPatch("baja/{id}")]
    public async Task<IActionResult> SoftDeleteRegistroKilometraje(int id)
    {
        var softDeleted = await _serviceRegistroKilometraje.SoftDeleteAsync(id);
        if (!softDeleted)
        {
            return NotFound();
        }
        return NoContent();
    }
    // ALTA LOGICA REGISTRO KILOMETRAJE
    [HttpPatch("alta/{id}")]
    public async Task<IActionResult> RestoreRegistroKilometraje(int id)
    {
        var restored = await _serviceRegistroKilometraje.RestoreAsync(id);
        if (!restored)
        {
            return NotFound();
        }
        return NoContent();
    }

    // ACA DEBERIAMOS TENER UN METODO Q BUSQUE REGISTRO POR PATENTE O SIMILAR
    // TAMBIEN UN METODO Q AÑADA KILOMETRAJE A LAS GOMAS QUE LLEVA EL VEHICULO
}