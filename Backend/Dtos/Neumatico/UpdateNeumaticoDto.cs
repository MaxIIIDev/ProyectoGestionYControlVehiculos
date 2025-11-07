using System.ComponentModel.DataAnnotations;

public class UpdateNeumaticoDto
{
    public UpdateNeumaticoDto() { }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    public string? Marca { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    public string? Medida { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    public bool? Estandar { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(1, int.MaxValue, ErrorMessage = "El campo {0} debe estar entre {1} y {2}")]
    public int? KmColocacion { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(1, int.MaxValue, ErrorMessage = "El campo {0} debe estar entre {1} y {2}")]
    public int? KmRodados { get; set; }

    public bool? DesgasteIrregular { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "El campo {0} debe estar entre {1} y {2}")]
    public int IdPosicionNeumatico { get; set; }

    [Range(
        typeof(DateOnly),
        "1900-01-01",
        "2200-01-01",
        ErrorMessage = "El campo {0} debe estar entre {1} y {2}"
    )]
    public DateOnly? FechaColocacion { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "El campo {0} debe estar entre {1} y {2}")]
    public int? IdVehiculo { get; set; }

    public bool Estado { get; set; }
}
