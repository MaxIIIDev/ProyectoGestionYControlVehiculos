using System.ComponentModel.DataAnnotations;

public class UpdateServiceDto 
{
    public UpdateServiceDto() { }

    

        [Required]
        public int IdVehiculo { get; set; } 

        public bool? FiltroDeAire { get; set; }

        public bool? FiltroDeAceite { get; set; }

        public bool? FiltroDeCombustible { get; set; }

        public bool? CorreaPolyV { get; set; }

        public bool? CorreaDentada { get; set; }

        public bool? AlineoBalanceo { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int? KmActual { get; set; }
        
        [Required]
        [Range(0, int.MaxValue)]
        public int? KmProx { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int? KmProxPolyV { get; set; }
       
        [Required]
        [Range(0, int.MaxValue)]
        public int? KmProxBombaDeAgua { get; set; }
        
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string? Detalle { get; set; }

        [Required]
        public DateOnly? Fecha { get; set; }
        
        public bool Estado { get; set; } = true;
}