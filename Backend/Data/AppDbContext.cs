
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    public DbSet<Auditoria> Auditorias { get; set; }
    public DbSet<ChecklistDiario> ChecklistsDiarios { get; set; }
    public DbSet<Documento> Documentos { get; set; }
    public DbSet<Matafuego> Matafuegos { get; set; }
    public DbSet<MensajeChat> MensajesChats { get; set; }
    public DbSet<Neumatico> Neumaticos { get; set; }
    public DbSet<Persona> Personas { get; set; }
    public DbSet<PosicionNeumatico> PosicionesNeumaticos { get; set; }
    public DbSet<RegistroKilometraje> RegistrosKilometraje { get; set; }
    public DbSet<Rol> Roles { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Vehiculo> Vehiculos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.Gmail)
            .IsUnique();
        modelBuilder.Entity<Usuario>()
            .HasOne(u => u.Persona)
            .WithOne(p => p.Usuario)
            .HasForeignKey<Usuario>(u => u.IdPersona);
        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.IdPersona).IsUnique();

        modelBuilder.Entity<Matafuego>()
            .HasOne(v => v.Vehiculo)
            .WithOne(m => m.Matafuego)
            .HasForeignKey<Vehiculo>(v => v.IdMatafuego);
        modelBuilder.Entity<Vehiculo>()
            .HasIndex(v => v.IdMatafuego).IsUnique();
    }

}