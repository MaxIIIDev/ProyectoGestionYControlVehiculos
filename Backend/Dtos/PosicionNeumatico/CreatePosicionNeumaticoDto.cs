using System.ComponentModel.DataAnnotations;

public class CreatePosicionNeumaticoDto
{
    public CreatePosicionNeumaticoDto() { }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener mínimo {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    public string? Nombre { get; set; } 
    

    public bool Estado { get; set; } = true;
}