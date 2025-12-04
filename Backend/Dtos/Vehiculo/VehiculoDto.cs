using Backend.Models;

public class VehiculoDto
{
    public int IdVehiculo { get; set; }

    public string Marca { get; set; } = "";

    public string Modelo { get; set; } = "";

    public int Anio { get; set; }

    public string Patente { get; set; } = "";

    public string Color { get; set; } = "";

    public int CantidadNeumaticos { get; set; }

    public int CantidadAuxilios { get; set; }

    public string NumeroChasis { get; set; } = "";

    public string NumeroMotor { get; set; } = "";

    public int? IdMatafuego { get; set; }
    public MatafuegoDto? Matafuego { get; set; }

    public List<Documento>? Documentos { get; set; } = new List<Documento>();
    public List<ChecklistDiario>? ChecklistsDiarios { get; set; }
    public List<RegistroKilometraje>? RegistrosKilometraje { get; set; }
    public List<Service>? Services { get; set; }
    public bool Estado { get; set; }
}
