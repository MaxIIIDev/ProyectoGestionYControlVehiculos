using System.ComponentModel.DataAnnotations;

public class UpdateRolDto 
{
    public UpdateRolDto() { }

    [Required]
    [StringLength(100)]
    public string? Nombre { get; set; }

    public bool Estado { get; set; } = true;
}