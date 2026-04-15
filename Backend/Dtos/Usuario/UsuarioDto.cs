using Backend.Models;

public class UsuarioDto(string gmail, string? avatarUrl, int idRol, int idPersona, bool estado)
{
    public int IdUsuario { get; set; }

    public string Gmail { get; set; } = gmail;

    public string? AvatarUrl { get; set; } = avatarUrl;

    public int IdRol { get; set; } = idRol;
    public Rol? Rol { get; set; } = null!;
    public int IdPersona { get; set; } = idPersona;
    public Persona? Persona { get; set; } = null!;
    public Auditoria? Auditoria { get; set; }

    public List<MensajeChat>? MensajeChat { get; set; }
    public bool Estado { get; set; } = estado;

    public UsuarioDto()
        : this(default!, default, default, default, true) { }
}
