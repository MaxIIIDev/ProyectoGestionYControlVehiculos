using System.ComponentModel.DataAnnotations;

public class CreateDocumentoDto
{
    public CreateDocumentoDto() { }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener mínimo {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    public string? Tipo { get; set; }
    public string? UrlArchivos { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(
        typeof(DateOnly),
        "1900-01-01",
        "2200-01-01",
        ErrorMessage = "El campo {0} debe estar entre {1} y {2}"
    )]
    public DateOnly? FechaEmision { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(
        typeof(DateOnly),
        "1900-01-01",
        "2200-01-01",
        ErrorMessage = "El campo {0} debe estar entre {1} y {2}"
    )]
    public DateOnly? FechaVencimiento { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(1, int.MaxValue, ErrorMessage = "El campo {0} debe ser mayor o igual a {1}")]
    public int? IdVehiculo { get; set; }
    public int? IdMatafuego { get; set; }
    public bool Estado { get; set; } = true;
}
