using Microsoft.AspNetCore.Mvc;
[Route("api/[controller]")]
[ApiController]
public class PruebaController : ControllerBase
{
    [HttpGet]
    public IActionResult GetPrueba()
    {
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