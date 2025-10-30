using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/rol")]
[ApiController]

public class ControllerRol : ControllerBase
{
    private readonly ServiceRol _serviceRol;

    public ControllerRol(ServiceRol serviceRol)
    {
        _serviceRol = serviceRol;
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
    public async Task<IActionResult> CreateRol([FromBody] Rol rol)
    {
        if (rol == null)
        {
            return BadRequest();
        }

        var createdRol = await _serviceRol.AddAsync(rol);
        return CreatedAtAction(nameof(GetRolById), new { id = createdRol.IdRol }, createdRol);
    }
    // PUT ACTUALIZAR ROL
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRol(int id, [FromBody] Rol rol)
    {
        if (id != rol.IdRol)
        {
            return BadRequest();
        }

        var updated = await _serviceRol.UpdateAsync(rol);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
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