using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class migracionnueva : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documentos_Vehiculos_IdVehiculo",
                table: "Documentos");

            migrationBuilder.DropIndex(
                name: "IX_Documentos_IdVehiculo",
                table: "Documentos");

            migrationBuilder.AlterColumn<int>(
                name: "IdVehiculo",
                table: "Documentos",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "IdMatafuego",
                table: "Documentos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VehiculoIdVehiculo",
                table: "Documentos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Documentos_VehiculoIdVehiculo",
                table: "Documentos",
                column: "VehiculoIdVehiculo");

            migrationBuilder.AddForeignKey(
                name: "FK_Documentos_Vehiculos_VehiculoIdVehiculo",
                table: "Documentos",
                column: "VehiculoIdVehiculo",
                principalTable: "Vehiculos",
                principalColumn: "IdVehiculo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documentos_Vehiculos_VehiculoIdVehiculo",
                table: "Documentos");

            migrationBuilder.DropIndex(
                name: "IX_Documentos_VehiculoIdVehiculo",
                table: "Documentos");

            migrationBuilder.DropColumn(
                name: "IdMatafuego",
                table: "Documentos");

            migrationBuilder.DropColumn(
                name: "VehiculoIdVehiculo",
                table: "Documentos");

            migrationBuilder.AlterColumn<int>(
                name: "IdVehiculo",
                table: "Documentos",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Documentos_IdVehiculo",
                table: "Documentos",
                column: "IdVehiculo");

            migrationBuilder.AddForeignKey(
                name: "FK_Documentos_Vehiculos_IdVehiculo",
                table: "Documentos",
                column: "IdVehiculo",
                principalTable: "Vehiculos",
                principalColumn: "IdVehiculo",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
