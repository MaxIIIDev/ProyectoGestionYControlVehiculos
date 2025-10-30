using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/neumaticos")]
[ApiController]

public class ControllerNeumatico : ControllerBase
{
    private readonly ServiceNeumatico _serviceNeumatico;

    public ControllerNeumatico(ServiceNeumatico serviceNeumatico)
    {
        _serviceNeumatico = serviceNeumatico;
    }

    // GET TODOS LOS NEUMATICOS
    [HttpGet]
    public async Task<IActionResult> GetAllNeumaticos()
    {
        var neumaticos = await _serviceNeumatico.GetAllAsync();
        return Ok(neumaticos);
    }

    // GET NEUMATICO POR ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetNeumaticoById(int id)
    {
        var neumatico = await _serviceNeumatico.GetByIdAsync(id);
        if (neumatico == null)
        {
            return NotFound();
        }
        return Ok(neumatico);
    }

    // POST NUEVO NEUMATICO
    [HttpPost]
    public async Task<IActionResult> AddNeumatico([FromBody] Neumatico neumatico)
    {
        var newNeumatico = await _serviceNeumatico.AddAsync(neumatico);
        return CreatedAtAction(nameof(GetNeumaticoById), new { id = newNeumatico.IdNeumatico }, newNeumatico);
    }

    // PUT ACTUALIZAR NEUMATICO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNeumatico(int id, [FromBody] Neumatico neumatico)
    {
        if (id != neumatico.IdNeumatico)
        {
            return BadRequest();
        }

        var updated = await _serviceNeumatico.UpdateAsync(neumatico);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }
    // DELETE NEUMATICO
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNeumatico(int id)
    {
        var deleted = await _serviceNeumatico.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
    // BAJA LOGICA NEUMATICO
    [HttpPatch("baja/{id}")]
    public async Task<IActionResult> SoftDeleteNeumatico(int id)
    {
        var result = await _serviceNeumatico.SoftDeleteAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
    // ALTA LOGICA NEUMATICO
    [HttpPatch("alta/{id}")]
    public async Task<IActionResult> RestoreNeumatico(int id)
    {
        var result = await _serviceNeumatico.RestoreAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}