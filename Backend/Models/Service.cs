using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Service(bool filtroDeAire, bool filtroDeAceite, bool filtroDeCombustible, bool correaPolyV, bool correaDentada, bool alineoBalanceo, int kmActual, int kmProx, int kmProxPolyV, int kmProxBombaDeAgua , int idVehiculo, string detalle, DateOnly fecha, bool estado)
    {
        [Key]
        public int IdService { get; set; } 

        public bool FiltroDeAire { get; set; } = filtroDeAire;

        public bool FiltroDeAceite { get; set; } = filtroDeAceite;

        public bool FiltroDeCombustible { get; set; } = filtroDeCombustible;

        public bool CorreaPolyV { get; set; } = correaPolyV;

        public bool CorreaDentada { get; set; } = correaDentada;

        public bool AlineoBalanceo { get; set; } = alineoBalanceo;
        [Required]
        public int KmActual { get; set; } = kmActual;
        [Required]
        public int KmProx { get; set; } = kmProx;
        [Required]
        public int KmProxPolyV { get; set; } = kmProxPolyV;
        [Required]
        public int KmProxBombaDeAgua { get; set; } = kmProxBombaDeAgua;
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Detalle { get; set; } = detalle;

        public DateOnly Fecha { get; set; } = fecha;
        [ForeignKey("Vehiculo")]
        public int IdVehiculo { get; set; } = idVehiculo;
        public Vehiculo? Vehiculo { get; set; } = null!;
        public bool Estado { get; set; } = estado;

        public Service() : this(false, false, false, false, false, false, 0, 0, 0, 0, 0, "", DateOnly.FromDateTime(DateTime.Now), true) { }
    }
}