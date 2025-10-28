using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Documento(string tipo,  DateTime fechaEmision, DateTime fechaVencimiento, int vehiculoId, bool estado)
    {
        [Key]
        public int IdDocumento { get; set; }
        public string Tipo { get; set; } = tipo;
        public List<string>? UrlArchivos { get; set; } 
        public DateTime FechaEmision { get; set; } = fechaEmision;
        public DateTime FechaVencimiento { get; set; } = fechaVencimiento;

        // Foreign key
        [ForeignKey("IdVehiculo")]

        public int IdVehiculo { get; set; } = vehiculoId;
        public Vehiculo? Vehiculo { get; set; } = null!;

        public bool Estado { get; set; } = estado;

        // Navigation property
       
        // Constructor vacío
        public Documento() : this(default!, default, default, default, true) { }
    }
}