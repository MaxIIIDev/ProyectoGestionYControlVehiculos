using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Matafuego(
        string proveedor,
        DateOnly fechaCarga,
        DateOnly fechaVencimiento,
        bool estado
    )
    {
        [Key]
        public int IdMatafuego { get; set; }
        public string Proveedor { get; set; } = proveedor;
        public DateOnly FechaCarga { get; set; } = fechaCarga;
        public DateOnly FechaVencimiento { get; set; } = fechaVencimiento;
        public bool Estado { get; set; } = estado;
        public Vehiculo? Vehiculo { get; set; }

        public Matafuego()
            : this(default!, default, default, true) { }
    }
}
