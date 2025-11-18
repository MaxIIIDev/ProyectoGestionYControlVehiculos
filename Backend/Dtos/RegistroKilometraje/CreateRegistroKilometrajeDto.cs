using System.ComponentModel.DataAnnotations;

public class CreateRegistroKilometrajeDto
{
    public CreateRegistroKilometrajeDto() { }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(1, int.MaxValue, ErrorMessage = "El campo {0} debe ser mayor a {1}")]
    public int IdVehiculo { get; set; }

    public DateTime FechaRegistro { get; set; } = DateTime.Now;

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(1, int.MaxValue, ErrorMessage = "El campo {0} debe ser mayor a {1}")]
    public int Kilometraje { get; set; }

    public bool Estado { get; set; } = true;
}
