using System.ComponentModel.DataAnnotations;

public class UpdateRegistroKilometrajeDto
{
    public UpdateRegistroKilometrajeDto() { }

    [Required(ErrorMessage = "El id del vehiculo es requerido")]
    [Range(1, int.MaxValue, ErrorMessage = "El id del vehiculo debe ser mayor a 0")]
    public int IdVehiculo { get; set; }

    [Required(ErrorMessage = "La fecha de registro es requerida")]
    public DateTime FechaRegistro { get; set; }

    [Required(ErrorMessage = "El kilometraje es requerido")]
    [Range(1, int.MaxValue, ErrorMessage = "El kilometraje debe ser mayor a 0")]
    public int Kilometraje { get; set; }

    public bool Estado { get; set; } = true;
}
