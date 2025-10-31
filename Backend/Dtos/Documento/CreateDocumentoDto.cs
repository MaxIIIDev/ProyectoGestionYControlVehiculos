

using System.ComponentModel.DataAnnotations;

public class CreateDocumentoDto
{

    public CreateDocumentoDto() { }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener mínimo {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    public string? Tipo { get; set; }
    public List<string>? UrlArchivos { get; set; }
    [Required(ErrorMessage = "El campo {0} es requerido")]
    public DateOnly? FechaEmision { get; set; }
    [Required(ErrorMessage = "El campo {0} es requerido")]
    public DateOnly? FechaVencimiento { get; set; }
    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(1, int.MaxValue, ErrorMessage = "El campo {0} debe ser mayor o igual a {1}")]
    public int IdVehiculo { get; set; }
    public bool Estado { get; set; } = true;

}