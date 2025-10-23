using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Persona(string nombre, string apellido, int dni, DateOnly fechaNac, int idUsuario, bool estado)
    {
        [Key]
        public int IdPersona { get; set; }

        public string Nombre { get; set; } = nombre;

        public string Apellido { get; set; } = apellido;

        public int Dni { get; set; } = dni;

        public DateOnly FechaNac { get; set; } = fechaNac;
        
        public int IdUsuario { get; set; } = idUsuario;
        [ForeignKey("IdUsuario")]
        public Usuario Usuario { get; set; } = null!;

        public bool Estado { get; set; } = estado;


        // Constructor vacío
        public Persona() : this(default!, default!, default, default, default, true) { }
    }
}