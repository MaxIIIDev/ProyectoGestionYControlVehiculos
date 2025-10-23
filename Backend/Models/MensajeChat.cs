using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class MensajeChat(string contenido, int idUsuario, Usuario usuario, DateTime fecha, bool estado)
    {
        [Key]
        public int IdMensajeChat { get; set; }

        public int IdUsuario { get; set; }

        [ForeignKey("IdUsuario")]
        public Usuario Usuario { get; set; } = null!;

        public DateTime Fecha { get; set; } = DateTime.Now;

        public string Contenido { get; set; } = contenido;

        public bool Estado { get; set; } = true;
        // Constructor vacío
        public MensajeChat() : this(default, default, null!, DateTime.Now, default!, true) { }
    }
}