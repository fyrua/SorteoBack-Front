using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SorteoBackend.Migrations
{
    /// <inheritdoc />
    public partial class RestoreCamposInscripcion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nombre",
                table: "Inscripciones",
                newName: "Telefono");

            migrationBuilder.AddColumn<string>(
                name: "Apellidos",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Direccion",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DocumentoPath",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Estado",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaNacimiento",
                table: "Inscripciones",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Nombres",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NumeroDocumento",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Apellidos",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "Direccion",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "DocumentoPath",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "Estado",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "FechaNacimiento",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "Nombres",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "NumeroDocumento",
                table: "Inscripciones");

            migrationBuilder.RenameColumn(
                name: "Telefono",
                table: "Inscripciones",
                newName: "Nombre");
        }
    }
}
