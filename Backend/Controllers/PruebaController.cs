using Backend.Services;
using Microsoft.AspNetCore.Mvc;
[Route("api/[controller]")]
[ApiController]
public class PruebaController : ControllerBase
{
    ServiceUsuario serviceUsuario;
    PruebaController(ServiceUsuario serviceUsuario)
    {
        this.serviceUsuario = serviceUsuario;
    }
    [HttpGet]
    public async Task<IActionResult> GetPrueba()
    {
        await serviceUsuario.resetPassword(1, "Reset123456@",null);
        return Ok(new
        {
            message = "Prueba"
        });
    }
    [HttpGet("test")]
    public IActionResult GetPrueba2()
    {
        throw new Exception("Prueba");
    }
}