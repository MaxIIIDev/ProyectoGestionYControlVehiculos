using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class changeNeumaticoSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Neumaticos_PosicionesNeumaticos_IdPosicionNeumatico",
                table: "Neumaticos");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "Fecha",
                table: "Services",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<int>(
                name: "IdPosicionNeumatico",
                table: "Neumaticos",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Neumaticos_PosicionesNeumaticos_IdPosicionNeumatico",
                table: "Neumaticos",
                column: "IdPosicionNeumatico",
                principalTable: "PosicionesNeumaticos",
                principalColumn: "IdPosicionNeumatico");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Neumaticos_PosicionesNeumaticos_IdPosicionNeumatico",
                table: "Neumaticos");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "Fecha",
                table: "Services",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "IdPosicionNeumatico",
                table: "Neumaticos",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Neumaticos_PosicionesNeumaticos_IdPosicionNeumatico",
                table: "Neumaticos",
                column: "IdPosicionNeumatico",
                principalTable: "PosicionesNeumaticos",
                principalColumn: "IdPosicionNeumatico",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
