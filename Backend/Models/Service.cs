using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Service(bool filtroDeAire, bool filtroDeAceite, bool filtroDeCombustible, bool correaPolyV, bool correaDentada, bool alineoBalanceo, int kmActual, int kmProx, int kmProxPolyV, int kmProxBombaDeAgua, string detalle, DateTime fecha, bool estado)
    {
        [Key]
        public int IdService { get; set; } 

        public bool FiltroDeAire { get; set; } = filtroDeAire;

        public bool FiltroDeAceite { get; set; } = filtroDeAceite;

        public bool FiltroDeCombustible { get; set; } = filtroDeCombustible;

        public bool CorreaPolyV { get; set; } = correaPolyV;

        public bool CorreaDentada { get; set; } = correaDentada;

        public bool AlineoBalanceo { get; set; } = alineoBalanceo;

        public int KmActual { get; set; } = kmActual;

        public int KmProx { get; set; } = kmProx;

        public int KmProxPolyV { get; set; } = kmProxPolyV;

        public int KmProxBombaDeAgua { get; set; } = kmProxBombaDeAgua;

        public string Detalle { get; set; } = detalle;

        public DateTime Fecha { get; set; } = fecha;

        public bool Estado { get; set; } = estado;
        // Foreign key
        public int VehiculoId { get; set; } = vehiculoId;

        // Navigation property
        [ForeignKey("VehiculoId")]
        public Vehiculo Vehiculo { get; set; } = null!;

        // Constructor vacío
        public Service() : this(default!, default!, default, default, default, default, default, default, default, default, default!, default, true) { }
    }
}