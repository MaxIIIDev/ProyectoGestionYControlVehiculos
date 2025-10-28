using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Usuario(string gmail, string contrasena, string? avatarUrl, int idRol, int idPersona, bool estado)
    {
        [Key]
        public int IdUsuario { get; set; }

        public string Gmail { get; set; } = gmail;

        public string Contrasena { get; set; } = contrasena;

        public string? AvatarUrl { get; set; } = avatarUrl;

        [ForeignKey("IdRol")]
        public int IdRol { get; set; } = idRol;
        public Rol? Rol { get; set; } = null!;

        [ForeignKey("IdPersona")]
        public int IdPersona { get; set; } = idPersona;
        public Persona? Persona { get; set; } = null!;

        public bool Estado { get; set; } = estado;

        // Constructor vacío
        public Usuario() : this(default!, default!, default, default, default, true)
        {
        }
    }
}