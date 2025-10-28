using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Matafuego(string proveedor, DateTime fechaCarga, DateTime fechaVencimiento, bool estado)
    {
        [Key]
        public int IdMatafuego { get; set; }
        public string Proveedor { get; set; } = proveedor;
        public DateTime FechaCarga { get; set; } = fechaCarga;
        public DateTime FechaVencimiento { get; set; } = fechaVencimiento;
        public bool Estado { get; set; } = estado;
        // Constructor vacío
        public Matafuego() : this(default!, default, default, true) { }
    }
}