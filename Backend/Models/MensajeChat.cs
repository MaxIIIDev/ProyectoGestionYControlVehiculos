using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class MensajeChat(string contenido, int idUsuario, Usuario usuario, DateTime fecha, bool estado)
    {
        [Key]
        public int IdMensajeChat { get; set; } = idUsuario;
        
        [ForeignKey("Usuario")]
        public int IdUsuario { get; set; }

        public Usuario? Usuario { get; set; } = usuario;

        public DateTime Fecha { get; set; } = fecha;
        [Required]
        public string Contenido { get; set; } = contenido;

        public bool Estado { get; set; } = estado;
        public MensajeChat() : this(default!, default, default!, default, true) { }
    }
}