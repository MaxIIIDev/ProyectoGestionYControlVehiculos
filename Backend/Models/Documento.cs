using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Documento(string tipo, string documento, DateTime fechaEmision, DateTime fechaVencimiento, int vehiculoId, bool estado)
    {
        [Key]
        public int IdDocumento { get; set; }
        public string Tipo { get; set; } = tipo;
        public string Documento { get; set; } = documento;
        public DateTime FechaEmision { get; set; } = fechaEmision;
        public DateTime FechaVencimiento { get; set; } = fechaVencimiento;

        public bool Estado { get; set; } = estado;

        // Foreign key
        public int VehiculoId { get; set; } = vehiculoId;

        // Navigation property
        [ForeignKey("VehiculoId")]
        public Vehiculo Vehiculo { get; set; } = null!;

        // Constructor vacío
        public Documento() : this(default!, default!, default, default, default, true) { }
    }
}