using System.ComponentModel.DataAnnotations;

public class CreatePersonaDto
{
    public CreatePersonaDto() { }
    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener mínimo {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    public string? Nombre { get; set; }
    
    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener mínimo {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    public string? Apellido { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(10000000, 99999999, ErrorMessage = "El campo {0} debe ser mayor o igual a {1}")]
    public int? Dni { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    public DateOnly? FechaNac { get; set; }

    public bool Estado { get; set; } = true;


}