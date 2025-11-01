using System.ComponentModel.DataAnnotations;

public class CreateRegistroKilometrajeDto
{
    public CreateRegistroKilometrajeDto() { }

    [Required]
    public int IdVehiculo { get; set; }

    [Required]
    public DateTime FechaRegistro { get; set; }

    [Required]
    public int Kilometraje { get; set; }

    public bool Estado { get; set; } = true;
}