using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Rol(string nombre, bool estado)
    {
        [Key]
        public int IdRol { get; set; }
        public string Nombre { get; set; } = nombre;
        public bool Estado { get; set; } = estado;

        // Constructor vacío
        public Rol() : this(default!, default) { }
    }
}