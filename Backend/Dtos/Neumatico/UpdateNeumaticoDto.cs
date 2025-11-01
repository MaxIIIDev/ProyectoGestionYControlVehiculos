using System.ComponentModel.DataAnnotations;

public class UpdateNeumaticoDto
{
    public UpdateNeumaticoDto() { }

    [Required]
    public string? Marca { get; set; }
    [Required]
    public string? Medida { get; set; }
    [Required]
    public bool? Estandar { get; set; }
    [Required]
    public int? KmColocacion { get; set; }
    [Required]
    public int? KmRodados { get; set; }

    public bool? DesgasteIrregular { get; set; }


    public int IdPosicionNeumatico { get; set; }


    public DateOnly? FechaColocacion { get; set; }


    public int IdVehiculo { get; set; }

    public bool Estado { get; set; }

}