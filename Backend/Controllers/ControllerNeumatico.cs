using AutoMapper;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/neumaticos")]
[ApiController]
public class ControllerNeumatico : ControllerBase
{
    private readonly ServiceNeumatico _serviceNeumatico;
    private readonly IMapper mapper;

    public ControllerNeumatico(ServiceNeumatico serviceNeumatico, IMapper mapper)
    {
        _serviceNeumatico = serviceNeumatico;
        this.mapper = mapper;
    }

    // GET TODOS LOS NEUMATICOS
    [HttpGet]
    public async Task<IActionResult> GetAllNeumaticos(
        [FromQuery] int numeroPagina = 1,
        [FromQuery] int tamanoPagina = 10
    )
    {
        PagedResponse<Neumatico> neumaticos = await _serviceNeumatico.GetAllAsync(
            numeroPagina,
            tamanoPagina
        );
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

    [HttpGet("getAllNotAsigned")]
    public async Task<IActionResult> GetAllNotAsigned()
    {
        var neumaticos = await _serviceNeumatico.GetAllNotAsignedAsync();
        return Ok(neumaticos);
    }

    // POST NUEVO NEUMATICO
    [HttpPost]
    public async Task<IActionResult> AddNeumatico([FromBody] CreateNeumaticoDto NeumaticoDto)
    {
        System.Console.WriteLine("hola");
        Neumatico neumatico = mapper.Map<Neumatico>(NeumaticoDto);
        if (NeumaticoDto == null)
            neumatico.FechaColocacion = null;

        var newNeumatico = await _serviceNeumatico.AddAsync(neumatico);
        return CreatedAtAction(
            nameof(GetNeumaticoById),
            new { id = newNeumatico.IdNeumatico },
            newNeumatico
        );
    }

    // PUT ACTUALIZAR NEUMATICO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNeumatico(
        int id,
        [FromBody] UpdateNeumaticoDto neumaticoDto
    )
    {
        if (id <= 0)
        {
            return BadRequest("El id debe ser mayor a 0");
        }

        Neumatico neumatico = mapper.Map<Neumatico>(neumaticoDto);
        neumatico.IdNeumatico = id;
        try
        {
            await _serviceNeumatico.UpdateAsync(id, neumaticoDto);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
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
