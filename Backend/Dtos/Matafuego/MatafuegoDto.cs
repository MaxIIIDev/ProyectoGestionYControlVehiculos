public class MatafuegoDto
{
    public int IdMatafuego { get; set; }
    public int NroSerie { get; set; }
    public string Proveedor { get; set; } = "";
    public DateOnly FechaCarga { get; set; }
    public DateOnly FechaVencimiento { get; set; }
    public bool Estado { get; set; }
}
