using System.ComponentModel.DataAnnotations;

public class UpdateUsuarioDto
{
    public UpdateUsuarioDto() { }

    [Required(ErrorMessage = "El id de la persona es requerido")]
    public int IdPersona { get; set; }

    [Required(ErrorMessage = "El id del rol es requerido")]
    public int IdRol { get; set; }

    [Required(ErrorMessage = "El correo es requerido")]
    [EmailAddress(ErrorMessage = "El correo no es valido")]
    [RegularExpression(
        @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|gob|com\.[a-z]{2}|gob\.[a-z]{2})$",
        ErrorMessage = "El correo debe ser válido."
    )]
    public string? Gmail { get; set; }

    [Required(ErrorMessage = "La contraseña es requerida")]
    [MinLength(8, ErrorMessage = "La contraseña debe tener al menos 8 caracteres")]
    [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$",
        ErrorMessage = "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial."
    )]
    public string? Contrasena { get; set; }

    public string? AvatarUrl { get; set; }

    public bool Estado { get; set; } = true;
}
