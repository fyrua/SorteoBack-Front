using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SorteoBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Telefono",
                table: "Inscripciones");

            migrationBuilder.RenameColumn(
                name: "TipoDocumento",
                table: "Inscripciones",
                newName: "Nombre");

            migrationBuilder.RenameColumn(
                name: "FechaRegistro",
                table: "Inscripciones",
                newName: "FechaInscripcion");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nombre",
                table: "Inscripciones",
                newName: "TipoDocumento");

            migrationBuilder.RenameColumn(
                name: "FechaInscripcion",
                table: "Inscripciones",
                newName: "FechaRegistro");

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
                nullable: true);

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

            migrationBuilder.AddColumn<string>(
                name: "Telefono",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
