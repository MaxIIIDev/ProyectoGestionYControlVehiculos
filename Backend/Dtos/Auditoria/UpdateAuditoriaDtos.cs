using System.ComponentModel.DataAnnotations;

public class UpdateAuditoriaDto 
{
    public UpdateAuditoriaDto() { }
    
    [Range(1, int.MaxValue, ErrorMessage = "El campo {0} debe ser mayor o igual a {1}")]
    public int? IdEntidad { get; set; } 
    [MinLength(3, ErrorMessage = "El campo {0} debe tener al menos {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener como maximo {1} caracteres")]
    public string? Entidad { get; set; }
    [MinLength(3, ErrorMessage = "El campo {0} debe tener al menos {1} caracteres")]
    [MaxLength(50, ErrorMessage = "El campo {0} debe tener como maximo {1} caracteres")]
    public string? Accion { get; set; } 
    [Required(ErrorMessage = "El campo {0} es requerido")]
    [Range(1, int.MaxValue, ErrorMessage = "El campo {0} debe ser mayor o igual a {1}")]
    public int IdUsuario { get; set; } 
}