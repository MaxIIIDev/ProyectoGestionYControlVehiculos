

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using Backend.Models;

public class PosicionNeumatico (int IdPosicionNeumatico, string Nombre)
{
    [Key]
    public int IdPosicionNeumatico { get; set; } = IdPosicionNeumatico;
    [NotNull]
    public string Nombre { get; set; } = Nombre;
    public List<Neumatico>? Neumaticos { get; set; }
    public PosicionNeumatico() : this(default, "") { }
} 