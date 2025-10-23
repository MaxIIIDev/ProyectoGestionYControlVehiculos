using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Vehiculo(string marca, string modelo, string patente, int anio, string color, string numeroChasis, string numeroMotor, List<Documento> documentos, bool estado)
    {
        [Key]
        public int IdVehiculo { get; set; }
        public string Marca { get; set; } = marca;
        public string Modelo { get; set; } = modelo;
        public string Patente { get; set; } = patente;
        public int Anio { get; set; } = anio;
        public string Color { get; set; } = color;
        public string NumeroChasis { get; set; } = numeroChasis;
        public string NumeroMotor { get; set; } = numeroMotor;
        public List<Documento> Documentos { get; set; } = new List<Documento>();

        public bool Estado { get; set; } = estado;

        // Constructor vacío
        public Vehiculo() : this(default!, default!, default!, default, default!, default!, default!, new List<Documento>(), default) { }
    }
}