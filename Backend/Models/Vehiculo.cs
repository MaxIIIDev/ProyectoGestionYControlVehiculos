using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Vehiculo(string marca, string modelo, int anio, string patente, string color, int cantidadNeumaticos, int cantidadAuxilios, string numeroChasis, string numeroMotor, bool estado)
    {
        [Key]
        public int IdVehiculo { get; set; }
        public string Marca { get; set; } = marca;
        public string Modelo { get; set; } = modelo;
        public int Anio { get; set; } = anio;
        public string Patente { get; set; } = patente;
        public string Color { get; set; } = color;
        public int CantidadNeumaticos { get; set; } = cantidadNeumaticos;
        public int CantidadAuxilios { get; set; } = cantidadAuxilios;
        public string NumeroChasis { get; set; } = numeroChasis;
        public string NumeroMotor { get; set; } = numeroMotor;
        [ForeignKey("IdMatafuego")]
        public int? IdMatafuego { get; set; }
        public Matafuego? Matafuego { get; set; }
        [ForeignKey("IdDocumento")]
        public int? IdDocumento { get; set; } 
        public List<Documento>? Documentos { get; set; } = new List<Documento>();

        public bool Estado { get; set; } = estado;

        // Constructor vacío
        public Vehiculo() : this(default!,"" , default, "", "", default, default, "", "", true) { }
    }
}