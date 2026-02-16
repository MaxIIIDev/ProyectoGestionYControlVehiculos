using System.ComponentModel.DataAnnotations;

public class RegisterDto
{
    public RegisterDto() { }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener mínimo {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    public string? Nombre { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [MinLength(3, ErrorMessage = "El campo {0} debe tener mínimo {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    public string? Apellido { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(10000000, 99999999, ErrorMessage = "El campo {0} debe ser mayor o igual a {1}")]
    public int? Dni { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(
        typeof(DateOnly),
        "1900-01-01",
        "2200-01-01",
        ErrorMessage = "El campo {0} debe estar entre {1} y {2}"
    )]
    public DateOnly? FechaNac { get; set; }

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
