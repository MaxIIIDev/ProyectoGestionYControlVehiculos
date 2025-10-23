using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class ChecklistDiario(int vehiculoId, DateTime fecha, bool faroDelanteroIzquierdo, bool faroDelanteroDerecho, bool faroTraseroIzquierdo, bool faroTraseroDerecho, bool liquidoFrenos, bool nivelAceite, bool nivelRefrigerante, bool nivelAguaParabrisas, bool nivelNafta, string observaciones, bool estado)
    {
        [Key]
        public int IdChecklistDiario { get; set; }
        public DateTime Fecha { get; set; } = fecha;
        public bool FaroDelanteroIzquierdo { get; set; } = faroDelanteroIzquierdo;
        public bool FaroDelanteroDerecho { get; set; } = faroDelanteroDerecho;
        public bool FaroTraseroIzquierdo { get; set; } = faroTraseroIzquierdo;
        public bool FaroTraseroDerecho { get; set; } = faroTraseroDerecho;
        public bool LiquidoFrenos { get; set; } = liquidoFrenos;
        
        public bool NivelAceite { get; set; } = nivelAceite;
        public bool NivelRefrigerante { get; set; } = nivelRefrigerante;
        public bool NivelAguaParabrisas { get; set; } = nivelAguaParabrisas;
        public bool NivelNafta { get; set; } = nivelNafta;
        public string Observaciones { get; set; } = observaciones;

        public bool Estado { get; set; } = estado;

        // Foreign key
        public int VehiculoId { get; set; } = vehiculoId;

        // Navigation property
        [ForeignKey("VehiculoId")]
        public Vehiculo Vehiculo { get; set; } = null!;

        // Constructor vacío
        public ChecklistDiario() : this(default, default, default, default, default, default, default, default, default, default!, default, true) { }
    }
}