using System.ComponentModel.DataAnnotations;

public class CreateMatafuegoDto
{
    public CreateMatafuegoDto() { }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener al menos 3 caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} no puede tener más de 50 caracteres")]
    public string Proveedor { get; set; } = String.Empty;

    [Range(
        typeof(DateOnly),
        "1900-01-01",
        "2200-12-31",
        ErrorMessage = "El campo {0} debe estar entre {1} y {2}"
    )]
    public DateOnly FechaCarga { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(
        typeof(DateOnly),
        "1900-01-01",
        "2200-12-31",
        ErrorMessage = "El campo {0} debe estar entre {1} y {2}"
    )]
    public DateOnly FechaVencimiento { get; set; }
    public bool Estado { get; set; } = true;
}
