using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Matafuego(string proveedor, DateTime fechaCarga, DateTime fechaVencimiento, int vehiculoId, bool estado)
    {
        [Key]
        public int IdMatafuego { get; set; }
        public string Proveedor { get; set; } = proveedor;
        public DateTime FechaCarga { get; set; } = fechaCarga;
        public DateTime FechaVencimiento { get; set; } = fechaVencimiento;

        public bool Estado { get; set; } = estado;

        // Foreign key
        public int VehiculoId { get; set; } = vehiculoId;

        // Navigation property
        [ForeignKey("VehiculoId")]
        public Vehiculo Vehiculo { get; set; } = null!;

        // Constructor vacío
        public Matafuego() : this(default!, default, default, default, true) { }
    }
}