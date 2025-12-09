using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class CambioEnServicios : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KmActual",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "KmProx",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "KmProxBombaDeAgua",
                table: "Services");

            migrationBuilder.RenameColumn(
                name: "KmProxPolyV",
                table: "Services",
                newName: "KmService");

            migrationBuilder.AlterColumn<string>(
                name: "Detalle",
                table: "Services",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<bool>(
                name: "Aceite",
                table: "Services",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "BombaAceite",
                table: "Services",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "BombaAgua",
                table: "Services",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "BombaCombustible",
                table: "Services",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Bujias",
                table: "Services",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Excepcional",
                table: "Services",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Proveedor",
                table: "Services",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<bool>(
                name: "Realizado",
                table: "Services",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ServicioExcepcional",
                table: "Services",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Aceite",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "BombaAceite",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "BombaAgua",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "BombaCombustible",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "Bujias",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "Excepcional",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "Proveedor",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "Realizado",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "ServicioExcepcional",
                table: "Services");

            migrationBuilder.RenameColumn(
                name: "KmService",
                table: "Services",
                newName: "KmProxPolyV");

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Detalle",
                keyValue: null,
                column: "Detalle",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Detalle",
                table: "Services",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "KmActual",
                table: "Services",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KmProx",
                table: "Services",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KmProxBombaDeAgua",
                table: "Services",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
