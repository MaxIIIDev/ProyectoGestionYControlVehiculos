using System.ComponentModel.DataAnnotations;

public class CreateVehiculoDto
{
    public CreateVehiculoDto() { }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener al menos {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener como máximo {1} caracteres")]
    public string? Marca { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener al menos {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener como máximo {1} caracteres")]
    public string? Modelo { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(1900, 2026, ErrorMessage = "El campo {0} debe estar entre {1} y {2}")]
    public int? Anio { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener al menos {1} caracteres")]
    [MaxLength(20, ErrorMessage = "El campo {0} debe tener como máximo {1} caracteres")]
    public string? Patente { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener al menos {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener como máximo {1} caracteres")]
    public string? Color { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(0, 20, ErrorMessage = "El campo {0} debe estar entre {1} y {2}")]
    public int? CantidadNeumaticos { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(0, 20, ErrorMessage = "El campo {0} debe estar entre {1} y {2}")]
    public int? CantidadAuxilios { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener al menos {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener como máximo {1} caracteres")]
    public string? NumeroChasis { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener al menos {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener como máximo {1} caracteres")]
    public string? NumeroMotor { get; set; }

    public bool Estado { get; set; } = true;
}
