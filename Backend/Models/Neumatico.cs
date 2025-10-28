using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models

{
    public enum PosicionNeumatico
    {
        DelanteroIzquierdo,
        DelanteroDerecho,
        TraseroIzquierdo,
        TraseroIzquierdoInterno,
        TraseroIzquierdoExterno,
        TraseroDerecho,
        TraseroDerechoInterno,
        TraseroDerechoExterno,
        Auxilio
    }
    public class Neumatico(string marca, string medida, bool estandar, int kmColocacion, int kmRodados, string desgasteIrregular, PosicionNeumatico posicion, DateTime fechaColocacion, int idVehiculo, bool estado)
    {
        [Key]
        public int IdNeumatico { get; set; }
        public string Marca { get; set; } = marca;
        public string Medida { get; set; } = medida;
        public bool Estandar { get; set; } = estandar;
        public int KmColocacion { get; set; } = kmColocacion;
        public int KmRodados { get; set; } = kmRodados;
        public string DesgasteIrregular { get; set; } = desgasteIrregular;
        public PosicionNeumatico Posicion { get; set; } = posicion;
        
        public DateTime FechaColocacion { get; set; } = fechaColocacion;

        [ForeignKey("IdVehiculo")]
        // Foreign key
        public int IdVehiculo { get; set; } = idVehiculo;
        // Navigation property
        public Vehiculo? Vehiculo { get; set; } = null!;
        public bool Estado { get; set; } = estado;

        // Constructor vacío
        public Neumatico() : this(default!, default!, default, default, default, default!, default, default, default, true) { }
    }
}