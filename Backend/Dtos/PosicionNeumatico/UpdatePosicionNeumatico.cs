using System.ComponentModel.DataAnnotations;

public class UpdatePosicionNeumaticoDto
{
    public UpdatePosicionNeumaticoDto() { }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener mínimo {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    public bool Estado { get; set; } = true;
}
