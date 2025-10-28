using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Auditoria(string entidad, int idEntidad, string accion, int idUsuario)
    {
        [Key]
        public int IdAuditoria { get; set; }
        public DateTime Fecha { get; set; } = DateTime.Now;
        public int IdEntidad { get; set; } = idEntidad;

        public string Entidad { get; set; } = entidad; // query = @SELECT * FROM Auditoria WHERE Entidad = '${nombreEntidad}'-> de acá sacamos el nombre de la entidad e interpolamos a la tabla de la entidad en cuestión.

        public string Accion { get; set; } = accion;

        [ForeignKey("IdUsuario")]
        public int IdUsuario { get; set; } = idUsuario;
        public Usuario? Usuario { get; set; } = null!;

        // Constructor vacío
        public Auditoria() : this(default!, default, default!, default) { }
    }
}