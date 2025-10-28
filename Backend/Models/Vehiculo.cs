using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Vehiculo(string marca, string modelo, int anio, string patente, string color, int cantidadNeumaticos, int cantidadAuxilios, string numeroChasis, string numeroMotor, bool estado)
    {
        [Key]
        public int IdVehiculo { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Marca { get; set; } = marca;
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Modelo { get; set; } = modelo;
        [Required]
        public int Anio { get; set; } = anio;
        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        public string Patente { get; set; } = patente;
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Color { get; set; } = color;
        [Required]
        public int CantidadNeumaticos { get; set; } = cantidadNeumaticos;
        [Required]
        public int CantidadAuxilios { get; set; } = cantidadAuxilios;
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string NumeroChasis { get; set; } = numeroChasis;
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string NumeroMotor { get; set; } = numeroMotor;
        [ForeignKey("Matafuego")]
        public int? IdMatafuego { get; set; }
        public Matafuego? Matafuego { get; set; }
        
        public List<Documento>? Documentos { get; set; } = new List<Documento>();
        public List<ChecklistDiario>? ChecklistsDiarios { get; set; } 
        public List<RegistroKilometraje>? RegistrosKilometraje { get; set; }
        public List<Service>? Services { get; set; }
        public bool Estado { get; set; } = estado;

        // Constructor vacío
        public Vehiculo() : this(default!,"" , default, "", "", default, default, "", "", true) { }
    }
}