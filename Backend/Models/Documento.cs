using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Documento(
        string tipo,
        DateOnly? fechaEmision,
        DateOnly? fechaVencimiento,
        int vehiculoId,
        bool estado
    )
    {
        [Key]
        public int IdDocumento { get; set; }
        public string Tipo { get; set; } = tipo;
        public string? UrlArchivos { get; set; }
        public DateOnly? FechaEmision { get; set; } = fechaEmision;
        public DateOnly? FechaVencimiento { get; set; } = fechaVencimiento;

        [ForeignKey("Vehiculo")]
        public int IdVehiculo { get; set; } = vehiculoId;
        public Vehiculo? Vehiculo { get; set; } = null!;
        public bool Estado { get; set; } = estado;

        public Documento()
            : this(default!, default, default, default, true) { }
    }
}
