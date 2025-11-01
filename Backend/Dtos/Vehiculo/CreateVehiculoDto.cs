using System.ComponentModel.DataAnnotations;

public class CreateVehiculoDto
{
    public CreateVehiculoDto() { }

        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string? Marca { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string? Modelo { get; set; }
        [Required]
        [Range(1900, 2026)]
        public int? Anio { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        public string? Patente { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string? Color { get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [Range(1,20 , ErrorMessage = "El campo {0} debe estar entre {1} y {2}")]
        public int? CantidadNeumaticos { get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [Range(1,20 , ErrorMessage = "El campo {0} debe estar entre {1} y {2}")]
        public int? CantidadAuxilios { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string? NumeroChasis { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string? NumeroMotor { get; set; }

        public bool Estado { get; set; } = true;
}