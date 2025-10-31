using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Persona(string nombre, string apellido, int dni, DateOnly fechaNac, int idUsuario, bool estado)
    {
        [Key]
        public int IdPersona { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Nombre { get; set; } = nombre;
        [Required]
        [MinLength(3)]
        [MaxLength(100)]
        public string Apellido { get; set; } = apellido;
        [Required]
        public int Dni { get; set; } = dni;
        [Required]
        public DateOnly FechaNac { get; set; } = fechaNac;
        [ForeignKey("Usuario")]
        public int? IdUsuario { get; set; } = idUsuario;
        public Usuario? Usuario { get; set; } = null!;
        public bool Estado { get; set; } = estado;
        public Persona() : this(default!, default!, default, default, default, true) { }
    }
}