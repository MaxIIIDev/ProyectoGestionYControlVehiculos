using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Documento(string? tarjetaVerde, string? tituloPropiedad, int vehiculoId, bool estado)
    {
        [Key]
        public int IdDocumento { get; set; }
        
        public string? TarjetaVerde { get; set; } = tarjetaVerde;
        public DateOnly? FechaEmisionTarjetaVerde { get; set; } = null;
        public DateOnly? FechaVencimientoTarjetaVerde { get; set; } = null;

        public string? TituloPropiedad { get; set; } = tituloPropiedad;
        public DateOnly? FechaEmisionTitulo { get; set; } = null;
        public DateOnly? FechaVencimientoTitulo { get; set; } = null;

        [ForeignKey("Vehiculo")]
        public int IdVehiculo { get; set; } = vehiculoId;
        public Vehiculo? Vehiculo { get; set; } = null!;
        public bool Estado { get; set; } = estado;

       
        public Documento() : this(default!, default!, default, true) { }
    }
}