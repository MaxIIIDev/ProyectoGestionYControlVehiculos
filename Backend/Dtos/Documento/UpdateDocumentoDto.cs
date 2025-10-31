

using System.ComponentModel.DataAnnotations;

public class UpdateDocumentoDto
{
    public UpdateDocumentoDto() { }


    [MinLength(3, ErrorMessage = "El campo {0} debe tener mínimo {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    public string? Tipo { get; set; }
    public List<string>? UrlArchivos { get; set; }
    public DateOnly? FechaEmision { get; set; }
    public DateOnly? FechaVencimiento { get; set; }
    [Required(ErrorMessage = "El campo {0} es obligatorio")]
    [Range(1, int.MaxValue, ErrorMessage = "El campo {0} debe ser mayor o igual a {1}")]
    public int IdVehiculo { get; set; }
    public bool Estado { get; set; } 
}