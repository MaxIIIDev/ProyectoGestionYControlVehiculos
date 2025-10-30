using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/posiciones-neumaticos")]
[ApiController]

public class ControllerPosicionNeumatico : ControllerBase
{
    private readonly ServicePosicionNeumatico _servicePosicionNeumatico;

    public ControllerPosicionNeumatico(ServicePosicionNeumatico servicePosicionNeumatico)
    {
        _servicePosicionNeumatico = servicePosicionNeumatico;
    }

    // GET TODAS LAS POSICIONES DE NEUMATICOS
    [HttpGet]
    public async Task<IActionResult> GetAllPosicionesNeumaticos()
    {
        var posiciones = await _servicePosicionNeumatico.GetAllAsync();
        return Ok(posiciones);
    }

    // GET POSICION DE NEUMATICO POR ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetPosicionNeumaticoById(int id)
    {
        var posicion = await _servicePosicionNeumatico.GetByIdAsync(id);
        if (posicion == null)
        {
            return NotFound();
        }
        return Ok(posicion);
    }
    // POST NUEVA POSICION DE NEUMATICO
    [HttpPost]
    public async Task<IActionResult> AddPosicionNeumatico([FromBody] PosicionNeumatico posicionNeumatico)
    {
        var newPosicion = await _servicePosicionNeumatico.AddAsync(posicionNeumatico);
        return CreatedAtAction(nameof(GetPosicionNeumaticoById), new { id = newPosicion.IdPosicionNeumatico }, newPosicion);
    }
    // PUT ACTUALIZAR POSICION DE NEUMATICO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePosicionNeumatico(int id, [FromBody] PosicionNeumatico posicionNeumatico)
    {
        if (id != posicionNeumatico.IdPosicionNeumatico)
        {
            return BadRequest();
        }

        var updated = await _servicePosicionNeumatico.UpdateAsync(posicionNeumatico);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }
    // DELETE POSICION DE NEUMATICO
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePosicionNeumatico(int id)
    {
        var deleted = await _servicePosicionNeumatico.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
}
