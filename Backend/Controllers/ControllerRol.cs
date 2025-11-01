using AutoMapper;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/rol")]
[ApiController]

public class ControllerRol : ControllerBase
{
    private readonly ServiceRol _serviceRol;
    private readonly IMapper mapper;

    public ControllerRol(ServiceRol serviceRol, IMapper mapper)
    {
        _serviceRol = serviceRol;
        this.mapper = mapper;
    }

    // GET TODOS LOS ROLES
    [HttpGet]
    public async Task<IActionResult> GetAllRoles()
    {
        var roles = await _serviceRol.GetAllAsync();
        return Ok(roles);
    }

    // GET ROL POR ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRolById(int id)
    {
        var rol = await _serviceRol.GetByIdAsync(id);
        if (rol == null)
        {
            return NotFound();
        }
        return Ok(rol);
    }
    // POST NUEVO ROL
    [HttpPost]
    public async Task<IActionResult> CreateRol([FromBody] CreateRolDto rolDto)
    {
        Rol rol = mapper.Map<Rol>(rolDto);
        var newRol = await _serviceRol.AddAsync(rol);
        return CreatedAtAction(nameof(GetRolById), new { id = newRol.IdRol }, newRol);
    }
    // PUT ACTUALIZAR ROL
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRol(int id, [FromBody] UpdateRolDto rolDto)
    {
        if (id <= 0)
        {
            return BadRequest("El id debe ser mayor a 0");
        }

        Rol rol = mapper.Map<Rol>(rolDto);
        rol.IdRol = id;
        try
        {
            await _serviceRol.UpdateAsync(id, rolDto);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
    // DELETE ROL
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRol(int id)
    {
        var deleted = await _serviceRol.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
    // BAJA LOGICA ROL
    [HttpPatch("baja/{id}")]
    public async Task<IActionResult> SoftDeleteRol(int id)
    {
        var softDeleted = await _serviceRol.SoftDeleteAsync(id);
        if (!softDeleted)
        {
            return NotFound();
        }
        return NoContent();
    }
    // ALTA LOGICA ROL
    [HttpPatch("alta/{id}")]
    public async Task<IActionResult> RestoreRol(int id)
    {
        var restored = await _serviceRol.RestoreAsync(id);
        if (!restored)
        {
            return NotFound();
        }
        return NoContent();
    }
}