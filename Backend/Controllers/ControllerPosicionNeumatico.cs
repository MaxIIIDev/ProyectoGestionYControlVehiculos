using AutoMapper;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/posiciones-neumaticos")]
[ApiController]

public class ControllerPosicionNeumatico : ControllerBase
{
    private readonly ServicePosicionNeumatico _servicePosicionNeumatico;
    private readonly IMapper mapper;
    public ControllerPosicionNeumatico(ServicePosicionNeumatico servicePosicionNeumatico, IMapper mapper)
    {
        _servicePosicionNeumatico = servicePosicionNeumatico;
        this.mapper = mapper;
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
    public async Task<IActionResult> AddPosicionNeumatico([FromBody] CreatePosicionNeumaticoDto posicionNeumaticoDto)
    {
        PosicionNeumatico posicionNeumatico = mapper.Map<PosicionNeumatico>(posicionNeumaticoDto);
        var newPosicion = await _servicePosicionNeumatico.AddAsync(posicionNeumatico);
        return CreatedAtAction(nameof(GetPosicionNeumaticoById), new { id = newPosicion.IdPosicionNeumatico }, newPosicion);
    }
    // PUT ACTUALIZAR POSICION DE NEUMATICO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePosicionNeumatico(int id, [FromBody] UpdatePosicionNeumaticoDto posicionNeumaticoDto)
    {
        if (id <= 0)
        {
            return BadRequest("El id debe ser mayor a 0");
        }

        PosicionNeumatico posicionNeumatico = mapper.Map<PosicionNeumatico>(posicionNeumaticoDto);
        posicionNeumatico.IdPosicionNeumatico = id;

        try
        {
            await _servicePosicionNeumatico.UpdateAsync(id, posicionNeumaticoDto);
            return NoContent();
        }
        catch(KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }

        
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
