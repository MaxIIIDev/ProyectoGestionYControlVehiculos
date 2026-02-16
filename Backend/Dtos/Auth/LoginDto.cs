using System.ComponentModel.DataAnnotations;

public class LoginDto
{
    public LoginDto() { }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [EmailAddress(ErrorMessage = "El correo no es valido")]
    [RegularExpression(
        @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|gob|com\.[a-z]{2}|gob\.[a-z]{2})$",
        ErrorMessage = "El correo debe ser válido."
    )]
    public string? Gmail { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(8, ErrorMessage = "La contraseña debe tener al menos 8 caracteres")]
    [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$",
        ErrorMessage = "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial."
    )]
    public string? Contrasena { get; set; }
}
