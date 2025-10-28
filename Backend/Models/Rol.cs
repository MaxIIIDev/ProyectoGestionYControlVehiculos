using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Rol(string nombre, bool estado)
    {
        [Key]
        public int IdRol { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        public string Nombre { get; set; } = nombre;
        public bool Estado { get; set; } = estado;

        public List<Usuario> Usuarios { get; set; } = new List<Usuario>();
        // Constructor vacío
        public Rol() : this(default!, default) { }
    }
}