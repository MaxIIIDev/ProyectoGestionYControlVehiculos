using AutoMapper;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/usuarios")]
[ApiController]
public class ControllerUsuario : ControllerBase
{
    private readonly ServiceUsuario _serviceUsuario;
    private readonly IMapper mapper;

    public ControllerUsuario(ServiceUsuario serviceUsuario, IMapper mapper)
    {
        _serviceUsuario = serviceUsuario;
        this.mapper = mapper;
    }

    // GET TODOS LOS USUARIOS
    [HttpGet]
    public async Task<IActionResult> GetAllUsuarios(
        [FromQuery] int numeroPagina = 1,
        [FromQuery] int tamanoPagina = 10
    )
    {
        PagedResponse<Usuario> usuarios = await _serviceUsuario.GetAllAsync(
            numeroPagina,
            tamanoPagina
        );
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
    public async Task<IActionResult> CreateUsuario([FromBody] CreateUsuarioDto usuarioDto)
    {
        Usuario usu = mapper.Map<Usuario>(usuarioDto);
        try
        {
            var newUsuario = await _serviceUsuario.AddAsync(usu);
            return CreatedAtAction(
                nameof(GetUsuarioById),
                new { id = newUsuario.IdUsuario },
                newUsuario
            );
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
    }

    // PUT ACTUALIZAR USUARIO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUsuario(int id, [FromBody] UpdateUsuarioDto usuarioDto)
    {
        if (id <= 0)
        {
            return BadRequest("El id debe ser mayor a 0");
        }

        Usuario usuario = mapper.Map<Usuario>(usuarioDto);
        usuario.IdUsuario = id;
        try
        {
            await _serviceUsuario.UpdateAsync(id, usuarioDto);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { mensaje = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
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
