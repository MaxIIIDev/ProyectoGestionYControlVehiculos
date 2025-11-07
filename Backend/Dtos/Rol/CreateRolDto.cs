using System.ComponentModel.DataAnnotations;

public class CreateRolDto
{
    public CreateRolDto() { }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [StringLength(
        100,
        ErrorMessage = "El campo {0} debe tener entre {2} y {1} caracteres",
        MinimumLength = 3
    )]
    public string? Nombre { get; set; }

    public bool Estado { get; set; } = true;
}
