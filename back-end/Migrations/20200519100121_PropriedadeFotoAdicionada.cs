using Microsoft.EntityFrameworkCore.Migrations;

namespace webApiDB.Migrations
{
    public partial class PropriedadeFotoAdicionada : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Foto",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Foto",
                table: "User");
        }
    }
}
