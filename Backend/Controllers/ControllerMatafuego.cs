using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/matafuegos")]
[ApiController]

public class ControllerMatafuego : ControllerBase
{
    private readonly ServiceMatafuego _serviceMatafuego;

    public ControllerMatafuego(ServiceMatafuego serviceMatafuego)
    {
        _serviceMatafuego = serviceMatafuego;
    }

    // GET TODOS LOS MATAFUEGOS
    [HttpGet]
    public async Task<IActionResult> GetAllMatafuegos()
    {
        var matafuegos = await _serviceMatafuego.GetAllAsync();
        return Ok(matafuegos);
    }

    // GET MATAFUEGO POR ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMatafuegoById(int id)
    {
        var matafuego = await _serviceMatafuego.GetByIdAsync(id);
        if (matafuego == null)
        {
            return NotFound();
        }
        return Ok(matafuego);
    }

    // POST NUEVO MATAFUEGO
    [HttpPost]
    public async Task<IActionResult> AddMatafuego([FromBody] Matafuego matafuego)
    {
        var newMatafuego = await _serviceMatafuego.AddAsync(matafuego);
        return CreatedAtAction(nameof(GetMatafuegoById), new { id = newMatafuego.IdMatafuego }, newMatafuego);
    }

    // PUT ACTUALIZAR MATAFUEGO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMatafuego(int id, [FromBody] Matafuego matafuego)
    {
        if (id != matafuego.IdMatafuego)
        {
            return BadRequest();
        }

        var updated = await _serviceMatafuego.UpdateAsync(matafuego);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    // DELETE MATAFUEGO
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMatafuego(int id)
    {
        var deleted = await _serviceMatafuego.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }

    // BAJA LOGICA MATAFUEGO
    [HttpPatch("baja/{id}")]
    public async Task<IActionResult> SoftDeleteMatafuego(int id)
    {
        var result = await _serviceMatafuego.SoftDeleteAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }

    // ALTA LOGICA MATAFUEGO
    [HttpPatch("alta/{id}")]
    public async Task<IActionResult> RestoreMatafuego(int id)
    {
        var result = await _serviceMatafuego.RestoreAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
// ACA HAY Q VER TAMBIEN EL TEMA DE LA CARGA DE DOCUMENTOS RELACIONADOS
}