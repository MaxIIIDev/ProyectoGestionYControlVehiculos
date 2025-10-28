using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class ChecklistDiario(int idVehiculo, DateTime fecha, bool faroDelanteroIzquierdo, bool faroDelanteroDerecho, bool faroTraseroIzquierdo, bool faroTraseroDerecho, bool liquidoFrenos, bool nivelAceite, bool presionNeumaticos, bool nivelFrenos, bool matafuegoVigente, bool nivelRefrigerante, bool nivelAguaParabrisas, /*bool nivelNafta*/ string? observaciones, bool estado)
    {
        [Key]
        public int IdChecklistDiario { get; set; }
        public bool FaroDelanteroIzquierdo { get; set; } = faroDelanteroIzquierdo;
        public bool FaroDelanteroDerecho { get; set; } = faroDelanteroDerecho;
        public bool FaroTraseroIzquierdo { get; set; } = faroTraseroIzquierdo;
        public bool FaroTraseroDerecho { get; set; } = faroTraseroDerecho;
        public bool LiquidoFrenos { get; set; } = liquidoFrenos;
        public bool NivelAceite { get; set; } = nivelAceite;
        public bool PresionNeumaticos { get; set; } = presionNeumaticos;
        public bool NivelFrenos { get; set; } = nivelFrenos;
        public bool NivelRefrigerante { get; set; } = nivelRefrigerante;
        public bool NivelAguaParabrisas { get; set; } = nivelAguaParabrisas;
        public bool MatafuegoVigente { get; set; } = matafuegoVigente;
        public string? Observaciones { get; set; } = observaciones;
        public DateTime Fecha { get; set; } = fecha;

        [ForeignKey("IdVehiculo")]
        // Foreign key
        public int IdVehiculo { get; set; } = idVehiculo;
        // Navigation property
        public Vehiculo? Vehiculo { get; set; } 
        public bool Estado { get; set; } = estado;

        // Constructor vacío
        public ChecklistDiario() : this(default, default, false, false, false, false, false, false, false, false, false, false, false /*, false*/, "", true) { }
    }
}