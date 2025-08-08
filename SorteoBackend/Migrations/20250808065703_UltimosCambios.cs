using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SorteoBackend.Migrations
{
    /// <inheritdoc />
    public partial class UltimosCambios : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TipoDocumento",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TipoDocumento",
                table: "Inscripciones");
        }
    }
}
