using System.ComponentModel.DataAnnotations;
using Backend.Models;

public class UpdatePersonaDto
{
    public UpdatePersonaDto() { }

    [MinLength(3, ErrorMessage = "El campo {0} debe tener mínimo {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    public string? Nombre { get; set; }

    [MinLength(3, ErrorMessage = "El campo {0} debe tener mínimo {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    public string? Apellido { get; set; }

    [Range(10000000, 99999999, ErrorMessage = "El campo {0} debe ser mayor o igual a {1}")]
    public int? Dni { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(
        typeof(DateOnly),
        "1900-01-01",
        "2200-01-01",
        ErrorMessage = "El campo {0} debe estar entre {1} y {2}"
    )]
    public DateOnly? FechaNac { get; set; }

    public bool Estado { get; set; } = true;
}
