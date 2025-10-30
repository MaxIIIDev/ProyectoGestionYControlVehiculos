using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/services")]
[ApiController]

public class ControllerService : ControllerBase
{
    private readonly ServiceService _serviceService;

    public ControllerService(ServiceService serviceService)
    {
        _serviceService = serviceService;
    }

    // GET TODOS LOS SERVICIOS
    [HttpGet]
    public async Task<IActionResult> GetAllServices()
    {
        var services = await _serviceService.GetAllAsync();
        return Ok(services);
    }

    // GET SERVICIO POR ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetServiceById(int id)
    {
        var service = await _serviceService.GetByIdAsync(id);
        if (service == null)
        {
            return NotFound();
        }
        return Ok(service);
    }
    // POST NUEVO SERVICIO
    [HttpPost]
    public async Task<IActionResult> CreateService([FromBody] Service service)
    {
        if (service == null)
        {
            return BadRequest();
        }

        var createdService = await _serviceService.AddAsync(service);
        return CreatedAtAction(nameof(GetServiceById), new { id = createdService.IdService }, createdService);
    }
    // PUT ACTUALIZAR SERVICIO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateService(int id, [FromBody] Service service)
    {
        if (id != service.IdService)
        {
            return BadRequest();
        }

        var updated = await _serviceService.UpdateAsync(service);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }
    // DELETE SERVICIO
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteService(int id)
    {
        var deleted = await _serviceService.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
    // BAJA LOGICA SERVICIO
    [HttpPatch("baja/{id}")]
    public async Task<IActionResult> SoftDeleteService(int id)
    {
        var softDeleted = await _serviceService.SoftDeleteAsync(id);
        if (!softDeleted)
        {
            return NotFound();
        }
        return NoContent();
    }
    // ALTA LOGICA SERVICIO
    [HttpPatch("alta/{id}")]
    public async Task<IActionResult> RestoreService(int id)
    {
        var restored = await _serviceService.RestoreAsync(id);
        if (!restored)
        {
            return NotFound();
        }
        return NoContent();
    }
}