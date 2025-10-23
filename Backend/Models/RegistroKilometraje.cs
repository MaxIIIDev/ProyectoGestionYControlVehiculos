using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class RegistroKilometraje(int vehiculoId, DateTime fechaRegistro, int kilometraje, bool estado)
    {
        [Key]
        public int IdRegistroKilometraje { get; set; }
        public DateTime FechaRegistro { get; set; } = fechaRegistro;
        public int Kilometraje { get; set; } = kilometraje;

        public bool Estado { get; set; } = estado;

        // Foreign key
        public int VehiculoId { get; set; } = vehiculoId;

        // Navigation property
        [ForeignKey("VehiculoId")]
        public Vehiculo Vehiculo { get; set; } = null!;

        // Constructor vacío
        public RegistroKilometraje() : this(default, default, default, true) { }
    }
}