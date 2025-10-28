using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models

{
    // public enum PosicionNeumatico
    // {
    //     DelanteroIzquierdo,
    //     DelanteroDerecho,
    //     TraseroIzquierdo,
    //     TraseroIzquierdoInterno,
    //     TraseroIzquierdoExterno,
    //     TraseroDerecho,
    //     TraseroDerechoInterno,
    //     TraseroDerechoExterno,
    //     Auxilio
    // }
    public class Neumatico(string marca, string medida, bool estandar, int kmColocacion, int kmRodados, bool desgasteIrregular,  DateOnly fechaColocacion, int idVehiculo, bool estado)
    {
        [Key]
        public int IdNeumatico { get; set; }
        [Required]
        public string Marca { get; set; } = marca;
        [Required]
        public string Medida { get; set; } = medida;
        [Required]
        public bool Estandar { get; set; } = estandar;
        [Required]
        public int KmColocacion { get; set; } = kmColocacion;
        [Required]
        public int KmRodados { get; set; } = kmRodados;

        public bool DesgasteIrregular { get; set; } = desgasteIrregular;

        [ForeignKey("Posicion")]
        public int IdPosicionNeumatico { get; set; }
        public PosicionNeumatico? Posicion { get; set; } 
        
        public DateOnly FechaColocacion { get; set; } = fechaColocacion;

        [ForeignKey("Vehiculo")]
        public int IdVehiculo { get; set; } = idVehiculo;
        public Vehiculo? Vehiculo { get; set; } = null!;
        public bool Estado { get; set; } = estado;

        public Neumatico() : this(default!, default!, default, default, default, default!,  default, default, true) { }
    }
}