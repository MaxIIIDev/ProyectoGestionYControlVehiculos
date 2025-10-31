using AutoMapper;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
[Route("api/checklist")]
[ApiController]

public class ControllerChecklistDiario : ControllerBase
{
    private readonly ServiceChecklistDiario _serviceChecklistDiario;
    private readonly IMapper mapper;
    public ControllerChecklistDiario(ServiceChecklistDiario serviceChecklistDiario, IMapper mapper)
    {
        _serviceChecklistDiario = serviceChecklistDiario;
        this.mapper = mapper;
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
    public async Task<IActionResult> AddChecklistDiario([FromBody] CreateChecklistDiarioDto checklistDto)
    {
        ChecklistDiario checklist = mapper.Map<ChecklistDiario>(checklistDto);
        var newChecklist = await _serviceChecklistDiario.AddAsync(checklist);
        return CreatedAtAction(nameof(GetChecklistDiarioById), new { id = newChecklist.IdChecklistDiario }, newChecklist);
    }

    // PUT ACTUALIZAR CHECKLIST DIARIO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateChecklistDiario(int id, [FromBody] UpdateChecklistDiarioDto checklistDto)
    {
        if (id <= 0) return BadRequest("El id debe ser mayor a 0.");

        ChecklistDiario checklist = mapper.Map<ChecklistDiario>(checklistDto);
        checklist.IdChecklistDiario = id;
        try
        {
            await _serviceChecklistDiario.UpdateAsync(checklist);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound("ChecklistDiario no encontrado con id: " + id);
        }

    }

    // DELETE CHECKLIST DIARIO
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteChecklistDiario(int id)
    {
        if (id <= 0) return BadRequest("El id debe ser mayor a 0.");
        try
        {
            if (await _serviceChecklistDiario.DeleteAsync(id) == false) return NotFound("ChecklistDiario no encontrado con id: " + id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });            
        }
    }

    // BAJA LOGICA CHECKLIST DIARIO
    [HttpPatch("baja/{id}")]
    public async Task<IActionResult> SoftDeleteChecklistDiario(int id)
    {
        if(id <= 0) return BadRequest("El id debe ser mayor a 0.");
        try
        {
            if( await _serviceChecklistDiario.SoftDeleteAsync(id) == false) return NotFound("ChecklistDiario no actualizado con id: " + id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    // ALTA LOGICA CHECKLIST DIARIO
    [HttpPatch("alta/{id}")]
    public async Task<IActionResult> RestoreChecklistDiario(int id)
    {
        if(id <= 0) return BadRequest("El id debe ser mayor a 0.");
        try
        {
            if( await _serviceChecklistDiario.RestoreAsync(id) == false) return NotFound("ChecklistDiario no actualizado con id: " + id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });            
        }
    }
}
