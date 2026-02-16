using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ControllerAuth : ControllerBase
{
    private readonly ServiceAuth _serviceAuth;

    public ControllerAuth(ServiceAuth serviceAuth)
    {
        _serviceAuth = serviceAuth;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        try
        {
            await _serviceAuth.Register(dto);
            return Ok(new { message = "Registro exitoso" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}
