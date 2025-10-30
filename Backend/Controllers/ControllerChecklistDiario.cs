using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/checklist")]
[ApiController]

public class ControllerChecklistDiario : ControllerBase
{
    private readonly ServiceChecklistDiario _serviceChecklistDiario;

    public ControllerChecklistDiario(ServiceChecklistDiario serviceChecklistDiario)
    {
        _serviceChecklistDiario = serviceChecklistDiario;
    }

    // GET TODOS LOS CHECKLISTS DIARIOS
    [HttpGet]
    public async Task<IActionResult> GetAllChecklistsDiarios()
    {
        var checklists = await _serviceChecklistDiario.GetAllAsync();
        return Ok(checklists);
    }

    // GET CHECKLIST DIARIO POR ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetChecklistDiarioById(int id)
    {
        var checklist = await _serviceChecklistDiario.GetByIdAsync(id);
        if (checklist == null)
        {
            return NotFound();
        }
        return Ok(checklist);
    }

    // POST NUEVO CHECKLIST DIARIO
    [HttpPost]
    public async Task<IActionResult> AddChecklistDiario([FromBody] ChecklistDiario checklist)
    {
        var newChecklist = await _serviceChecklistDiario.AddAsync(checklist);
        return CreatedAtAction(nameof(GetChecklistDiarioById), new { id = newChecklist.IdChecklistDiario }, newChecklist);
    }

    // PUT ACTUALIZAR CHECKLIST DIARIO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateChecklistDiario(int id, [FromBody] ChecklistDiario checklist)
    {
        if (id != checklist.IdChecklistDiario)
        {
            return BadRequest();
        }

        var updated = await _serviceChecklistDiario.UpdateAsync(checklist);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    // DELETE CHECKLIST DIARIO
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteChecklistDiario(int id)
    {
        var deleted = await _serviceChecklistDiario.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }

    // BAJA LOGICA CHECKLIST DIARIO
    [HttpPatch("baja/{id}")]
    public async Task<IActionResult> SoftDeleteChecklistDiario(int id)
    {
        var updated = await _serviceChecklistDiario.SoftDeleteAsync(id);
        if (!updated)
        {
            return NotFound();
        }
        return NoContent();
    }

    // ALTA LOGICA CHECKLIST DIARIO
    [HttpPatch("alta/{id}")]
    public async Task<IActionResult> RestoreChecklistDiario(int id)
    {
        var updated = await _serviceChecklistDiario.RestoreAsync(id);
        if (!updated)
        {
            return NotFound();
        }
        return NoContent();
    }
}
