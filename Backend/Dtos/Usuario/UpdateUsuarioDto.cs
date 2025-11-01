using System.ComponentModel.DataAnnotations;

public class UpdateUsuarioDto 
{
    public UpdateUsuarioDto() { }

        [Required]
        public int IdPersona { get; set; }

        [Required]
        public int IdRol { get; set; }

        [Required]
        [EmailAddress]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|gob|com\.[a-z]{2}|gob\.[a-z]{2})$", ErrorMessage = "El correo debe ser válido.")]
        public string? Gmail { get; set; }

        [Required]
        [MinLength(8)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$", ErrorMessage = "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial.")]
        public string? Contrasena { get; set; }
        
        public string? AvatarUrl { get; set; }

        public bool Estado { get; set; } = true;
}