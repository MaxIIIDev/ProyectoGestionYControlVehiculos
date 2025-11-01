using AutoMapper;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/vehiculos")]
[ApiController]

public class ControllerVehiculo : ControllerBase
{
    private readonly ServiceVehiculo _serviceVehiculo;
    private readonly IMapper mapper;

    public ControllerVehiculo(ServiceVehiculo serviceVehiculo, IMapper mapper)
    {
        _serviceVehiculo = serviceVehiculo;
        this.mapper = mapper;
    }

    // GET TODOS LOS VEHICULOS
    [HttpGet]
    public async Task<IActionResult> GetAllVehiculos()
    {
        var vehiculos = await _serviceVehiculo.GetAllAsync();
        return Ok(vehiculos);
    }

    // GET VEHICULO POR ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetVehiculoById(int id)
    {
        var vehiculo = await _serviceVehiculo.GetByIdAsync(id);
        if (vehiculo == null)
        {
            return NotFound();
        }
        return Ok(vehiculo);
    }
    // POST NUEVO VEHICULO
    [HttpPost]
    public async Task<IActionResult> CreateVehiculo([FromBody] CreateVehiculoDto vehiculoDto)
    {
        Vehiculo vehiculo = mapper.Map<Vehiculo>(vehiculoDto);
        var newVehiculo = await _serviceVehiculo.AddAsync(vehiculo);
        return CreatedAtAction(nameof(GetVehiculoById), new { id = newVehiculo.IdVehiculo }, newVehiculo);
    }
    // PUT ACTUALIZAR VEHICULO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVehiculo(int id, [FromBody] UpdateVehiculoDto vehiculoDto)
    {
        if (id <= 0)
        {
            return BadRequest("El id debe ser mayor a 0");
        }

        Vehiculo vehiculo = mapper.Map<Vehiculo>(vehiculoDto);
        vehiculo.IdVehiculo = id;
        try
        {
            await _serviceVehiculo.UpdateAsync(id, vehiculoDto);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { Message = ex.Message });
        }
    }
    // DELETE VEHICULO
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVehiculo(int id)
    {
        var deleted = await _serviceVehiculo.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
    // BAJA LOGICA VEHICULO
    [HttpPatch("baja/{id}")]
    public async Task<IActionResult> SoftDeleteVehiculo(int id)
    {
        var softDeleted = await _serviceVehiculo.SoftDeleteAsync(id);
        if (!softDeleted)
        {
            return NotFound();
        }
        return NoContent();
    }
    // ALTA LOGICA VEHICULO
    [HttpPatch("alta/{id}")]
    public async Task<IActionResult> RestoreVehiculo(int id)
    {
        var restored = await _serviceVehiculo.RestoreAsync(id);
        if (!restored)
        {
            return NotFound();
        }
        return NoContent();
    }
}
