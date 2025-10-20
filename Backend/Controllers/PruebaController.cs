using Microsoft.AspNetCore.Mvc;
[Route("api/[controller]")]
[ApiController]
public class PruebaController : ControllerBase
{
    [HttpGet]
    public IActionResult GetPrueba()
    {
        return Ok(new {
            message = "Prueba"
        });
    }
}