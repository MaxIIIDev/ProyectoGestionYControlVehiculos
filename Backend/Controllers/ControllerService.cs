using AutoMapper;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/services")]
[ApiController]

public class ControllerService : ControllerBase
{
    private readonly ServiceService _serviceService;
    private readonly IMapper mapper;

    public ControllerService(ServiceService serviceService, IMapper mapper)
    {
        _serviceService = serviceService;
        this.mapper = mapper;
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
    public async Task<IActionResult> CreateService([FromBody] CreateServiceDto serviceDto)
    {
        Service service = mapper.Map<Service>(serviceDto);
        var newService = await _serviceService.AddAsync(service);
        return CreatedAtAction(nameof(GetServiceById), new { id = newService.IdService }, newService);
    }
    // PUT ACTUALIZAR SERVICIO
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateService(int id, [FromBody] UpdateServiceDto serviceDto)
    {
        if (id <= 0)
        {
            return BadRequest("El id debe ser mayor a 0");
        }
        Service service = mapper.Map<Service>(serviceDto);
        service.IdService = id;

        try
        {
            await _serviceService.UpdateAsync(id ,serviceDto);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }

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