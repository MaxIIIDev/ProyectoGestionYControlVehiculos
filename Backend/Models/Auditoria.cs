using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Auditoria(string entidad, int idEntidad, string accion, DateTime fechaAccion, int idUsuario)
    {
        [Key]
        public int IdAuditoria { get; set; }

        public string Entidad { get; set; } = entidad; // query = @SELECT * FROM Auditoria WHERE Entidad = '${nombreEntidad}'-> de acá sacamos el nombre de la entidad e interpolamos a la tabla de la entidad en cuestión.

        public int IdEntidad { get; set; } = idEntidad;

        public string Accion { get; set; } = accion;

        public DateTime FechaAccion { get; set; } = fechaAccion;

        public int IdUsuario { get; set; } = idUsuario;
        [ForeignKey("IdUsuario")]
        public Usuario Usuario { get; set; } = null!;

        // Constructor vacío
        public Auditoria() : this(default!, default, default!, default, default) { }
    }
}