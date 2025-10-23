using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models

{
    public enum PosicionNeumatico
    {
        DelanteroIzquierdo,
        DelanteroDerecho,
        TraseroIzquierdo,
        TraseroDerecho,  
        TraseroDerechoInterno,
        TraseroIzquierdoInterno,
        Auxilio,
        TraseroDerechoExterno,
        TraseroIzquierdoExterno
    }
    public class Neumatico(string marca, string medida, bool recapado, int kmColocacion, int kmRodados, string desgasteIrregular, PosicionNeumatico posicion, DateTime fechaColocacion, int vehiculoId, bool estado)
    {
        [Key]
        public int IdNeumatico { get; set; }
        public string Marca { get; set; } = marca;

        public string Medida { get; set; } = medida;
        public bool Recapado { get; set; } = recapado;
        public int KmColocacion { get; set; } = kmColocacion;
        public int KmRodados { get; set; } = kmRodados;
        public string DesgasteIrregular { get; set; } = desgasteIrregular;
        public PosicionNeumatico Posicion { get; set; } = posicion;
        
        public DateTime FechaColocacion { get; set; } = fechaColocacion;

        public bool Estado { get; set; } = estado;

        // Foreign key
        public int VehiculoId { get; set; } = vehiculoId;

        // Navigation property
        [ForeignKey("VehiculoId")]
        public Vehiculo Vehiculo { get; set; } = null!;

        // Constructor vacío
        public Neumatico() : this(default!, default!, default, default, default, default!, default, default, default, true) { }
    }
}