using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Usuario(string email, string contrasena, string? avatarUrl, int idRol, int idPersona, bool estado)
    {
        [Key]
        public int IdUsuario { get; set; }

        public string Email { get; set; } = email;

        public string Contrasena { get; set; } = contrasena;

        public string? AvatarUrl { get; set; } = avatarUrl;

        public int IdRol { get; set; } = idRol;
        [ForeignKey("IdRol")]
        public Rol Rol { get; set; } = null!;

        public int IdPersona { get; set; } = idPersona;
        [ForeignKey("IdPersona")]
        public Persona Persona { get; set; } = null!;

        public bool Estado { get; set; } = estado;

        // Constructor vacío
        public Usuario() : this(default!, default!, default, default, default, true)
        {
        }
    }
}