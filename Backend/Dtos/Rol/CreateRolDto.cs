using System.ComponentModel.DataAnnotations;

public class CreateRolDto 
{
    public CreateRolDto() { }

    [Required]
    [StringLength(100)]
    public string? Nombre { get; set; }

    public bool Estado { get; set; } = true;
}