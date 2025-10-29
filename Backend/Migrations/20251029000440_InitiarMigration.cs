using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitiarMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Matafuegos",
                columns: table => new
                {
                    IdMatafuego = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Proveedor = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FechaCarga = table.Column<DateOnly>(type: "date", nullable: false),
                    FechaVencimiento = table.Column<DateOnly>(type: "date", nullable: false),
                    Estado = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matafuegos", x => x.IdMatafuego);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Personas",
                columns: table => new
                {
                    IdPersona = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Apellido = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Dni = table.Column<int>(type: "int", nullable: false),
                    FechaNac = table.Column<DateOnly>(type: "date", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: false),
                    Estado = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personas", x => x.IdPersona);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PosicionesNeumaticos",
                columns: table => new
                {
                    IdPosicionNeumatico = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PosicionesNeumaticos", x => x.IdPosicionNeumatico);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    IdRol = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Estado = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.IdRol);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Vehiculos",
                columns: table => new
                {
                    IdVehiculo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Marca = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Modelo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Anio = table.Column<int>(type: "int", nullable: false),
                    Patente = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Color = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CantidadNeumaticos = table.Column<int>(type: "int", nullable: false),
                    CantidadAuxilios = table.Column<int>(type: "int", nullable: false),
                    NumeroChasis = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NumeroMotor = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IdMatafuego = table.Column<int>(type: "int", nullable: true),
                    Estado = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehiculos", x => x.IdVehiculo);
                    table.ForeignKey(
                        name: "FK_Vehiculos_Matafuegos_IdMatafuego",
                        column: x => x.IdMatafuego,
                        principalTable: "Matafuegos",
                        principalColumn: "IdMatafuego");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Gmail = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Contrasena = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AvatarUrl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IdRol = table.Column<int>(type: "int", nullable: false),
                    IdPersona = table.Column<int>(type: "int", nullable: false),
                    Estado = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.IdUsuario);
                    table.ForeignKey(
                        name: "FK_Usuarios_Personas_IdPersona",
                        column: x => x.IdPersona,
                        principalTable: "Personas",
                        principalColumn: "IdPersona",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Usuarios_Roles_IdRol",
                        column: x => x.IdRol,
                        principalTable: "Roles",
                        principalColumn: "IdRol",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ChecklistsDiarios",
                columns: table => new
                {
                    IdChecklistDiario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FaroDelanteroIzquierdo = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FaroDelanteroDerecho = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FaroTraseroIzquierdo = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FaroTraseroDerecho = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    LiquidoFrenos = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    NivelAceite = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    PresionNeumaticos = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    NivelFrenos = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    NivelRefrigerante = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    NivelAguaParabrisas = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    MatafuegoVigente = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Observaciones = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Fecha = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IdVehiculo = table.Column<int>(type: "int", nullable: false),
                    Estado = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChecklistsDiarios", x => x.IdChecklistDiario);
                    table.ForeignKey(
                        name: "FK_ChecklistsDiarios_Vehiculos_IdVehiculo",
                        column: x => x.IdVehiculo,
                        principalTable: "Vehiculos",
                        principalColumn: "IdVehiculo",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Documentos",
                columns: table => new
                {
                    IdDocumento = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Tipo = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UrlArchivos = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FechaEmision = table.Column<DateOnly>(type: "date", nullable: false),
                    FechaVencimiento = table.Column<DateOnly>(type: "date", nullable: false),
                    IdVehiculo = table.Column<int>(type: "int", nullable: false),
                    Estado = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documentos", x => x.IdDocumento);
                    table.ForeignKey(
                        name: "FK_Documentos_Vehiculos_IdVehiculo",
                        column: x => x.IdVehiculo,
                        principalTable: "Vehiculos",
                        principalColumn: "IdVehiculo",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Neumaticos",
                columns: table => new
                {
                    IdNeumatico = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Marca = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Medida = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Estandar = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    KmColocacion = table.Column<int>(type: "int", nullable: false),
                    KmRodados = table.Column<int>(type: "int", nullable: false),
                    DesgasteIrregular = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IdPosicionNeumatico = table.Column<int>(type: "int", nullable: false),
                    FechaColocacion = table.Column<DateOnly>(type: "date", nullable: false),
                    IdVehiculo = table.Column<int>(type: "int", nullable: false),
                    Estado = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Neumaticos", x => x.IdNeumatico);
                    table.ForeignKey(
                        name: "FK_Neumaticos_PosicionesNeumaticos_IdPosicionNeumatico",
                        column: x => x.IdPosicionNeumatico,
                        principalTable: "PosicionesNeumaticos",
                        principalColumn: "IdPosicionNeumatico",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Neumaticos_Vehiculos_IdVehiculo",
                        column: x => x.IdVehiculo,
                        principalTable: "Vehiculos",
                        principalColumn: "IdVehiculo",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RegistrosKilometraje",
                columns: table => new
                {
                    IdRegistroKilometraje = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Kilometraje = table.Column<int>(type: "int", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Estado = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IdVehiculo = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrosKilometraje", x => x.IdRegistroKilometraje);
                    table.ForeignKey(
                        name: "FK_RegistrosKilometraje_Vehiculos_IdVehiculo",
                        column: x => x.IdVehiculo,
                        principalTable: "Vehiculos",
                        principalColumn: "IdVehiculo",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    IdService = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FiltroDeAire = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FiltroDeAceite = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FiltroDeCombustible = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CorreaPolyV = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CorreaDentada = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    AlineoBalanceo = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    KmActual = table.Column<int>(type: "int", nullable: false),
                    KmProx = table.Column<int>(type: "int", nullable: false),
                    KmProxPolyV = table.Column<int>(type: "int", nullable: false),
                    KmProxBombaDeAgua = table.Column<int>(type: "int", nullable: false),
                    Detalle = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Fecha = table.Column<DateOnly>(type: "date", nullable: false),
                    IdVehiculo = table.Column<int>(type: "int", nullable: false),
                    Estado = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.IdService);
                    table.ForeignKey(
                        name: "FK_Services_Vehiculos_IdVehiculo",
                        column: x => x.IdVehiculo,
                        principalTable: "Vehiculos",
                        principalColumn: "IdVehiculo",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Auditorias",
                columns: table => new
                {
                    IdAuditoria = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Fecha = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IdEntidad = table.Column<int>(type: "int", nullable: false),
                    Entidad = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Accion = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Auditorias", x => x.IdAuditoria);
                    table.ForeignKey(
                        name: "FK_Auditorias_Usuarios_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MensajesChats",
                columns: table => new
                {
                    IdMensajeChat = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IdUsuario = table.Column<int>(type: "int", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Contenido = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Estado = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MensajesChats", x => x.IdMensajeChat);
                    table.ForeignKey(
                        name: "FK_MensajesChats_Usuarios_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Auditorias_IdUsuario",
                table: "Auditorias",
                column: "IdUsuario",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChecklistsDiarios_IdVehiculo",
                table: "ChecklistsDiarios",
                column: "IdVehiculo");

            migrationBuilder.CreateIndex(
                name: "IX_Documentos_IdVehiculo",
                table: "Documentos",
                column: "IdVehiculo");

            migrationBuilder.CreateIndex(
                name: "IX_MensajesChats_IdUsuario",
                table: "MensajesChats",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Neumaticos_IdPosicionNeumatico",
                table: "Neumaticos",
                column: "IdPosicionNeumatico");

            migrationBuilder.CreateIndex(
                name: "IX_Neumaticos_IdVehiculo",
                table: "Neumaticos",
                column: "IdVehiculo");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrosKilometraje_IdVehiculo",
                table: "RegistrosKilometraje",
                column: "IdVehiculo");

            migrationBuilder.CreateIndex(
                name: "IX_Services_IdVehiculo",
                table: "Services",
                column: "IdVehiculo");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_Gmail",
                table: "Usuarios",
                column: "Gmail",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_IdPersona",
                table: "Usuarios",
                column: "IdPersona",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_IdRol",
                table: "Usuarios",
                column: "IdRol");

            migrationBuilder.CreateIndex(
                name: "IX_Vehiculos_IdMatafuego",
                table: "Vehiculos",
                column: "IdMatafuego",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Auditorias");

            migrationBuilder.DropTable(
                name: "ChecklistsDiarios");

            migrationBuilder.DropTable(
                name: "Documentos");

            migrationBuilder.DropTable(
                name: "MensajesChats");

            migrationBuilder.DropTable(
                name: "Neumaticos");

            migrationBuilder.DropTable(
                name: "RegistrosKilometraje");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "PosicionesNeumaticos");

            migrationBuilder.DropTable(
                name: "Vehiculos");

            migrationBuilder.DropTable(
                name: "Personas");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Matafuegos");
        }
    }
}
