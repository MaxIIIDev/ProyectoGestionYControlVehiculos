using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/usuarios")]
[ApiController]

public class ControllerUsuario : ControllerBase
{
    private readonly ServiceUsuario _serviceUsuario;

    public ControllerUsuario(ServiceUsuario serviceUsuario)
    {
        _serviceUsuario = serviceUsuario;
    }

    // GET TODOS LOS USUARIOS
    [HttpGet]
    public async Task<IActionResult> GetAllUsuarios()
    {
        var usuarios = await _serviceUsuario.GetAllAsync();
        return Ok(usuarios);
    }

    // GET USUARIO POR ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUsuarioById(int id)
    {
        var usuario = await _serviceUsuario.GetByIdAsync(id);
        if (usuario == null)
        {
            return NotFound();
        }
        return Ok(usuario);
    }
    // POST NUEVO USUARIO
    [HttpPost]
    public async Task<IActionResult> CreateUsuario([FromBody] Usuario usuario)
    {
        if (usuario == null)
        {
            return BadRequest();
        }

        var createdUsuario = await _serviceUsuario.AddAsync(usuario);
        return CreatedAtAction(nameof(GetUsuarioById), new { id = createdUsuario.IdUsuario }, createdUsuario);
    }
    // PUT ACTUALIZAR USUARIO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUsuario(int id, [FromBody] Usuario usuario)
    {
        if (id != usuario.IdUsuario)
        {
            return BadRequest();
        }

        var updated = await _serviceUsuario.UpdateAsync(usuario);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }
    // DELETE USUARIO
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUsuario(int id)
    {
        var deleted = await _serviceUsuario.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
    // BAJA LOGICA USUARIO
    [HttpPatch("baja/{id}")]
    public async Task<IActionResult> SoftDeleteUsuario(int id)
    {
        var softDeleted = await _serviceUsuario.SoftDeleteAsync(id);
        if (!softDeleted)
        {
            return NotFound();
        }
        return NoContent();
    }
    // ALTA LOGICA USUARIO
    [HttpPatch("alta/{id}")]
    public async Task<IActionResult> RestoreUsuario(int id)
    {
        var restored = await _serviceUsuario.RestoreAsync(id);
        if (!restored)
        {
            return NotFound();
        }
        return NoContent();
    }
}
