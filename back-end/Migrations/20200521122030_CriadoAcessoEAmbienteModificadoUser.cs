using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace webApiDB.Migrations
{
    public partial class CriadoAcessoEAmbienteModificadoUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ambiente",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreateAt = table.Column<DateTime>(nullable: false),
                    UpdateAt = table.Column<DateTime>(nullable: false),
                    TipoAmbiente = table.Column<string>(nullable: true),
                    Numero = table.Column<int>(nullable: false),
                    Bloco = table.Column<char>(nullable: false),
                    Area = table.Column<string>(nullable: true),
                    UnidInstitucional = table.Column<string>(nullable: true),
                    Capacidade = table.Column<int>(nullable: false),
                    TotalPessoa = table.Column<int>(nullable: false),
                    TotalComputador = table.Column<int>(nullable: false),
                    IpCamera = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ambiente", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Acesso",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreateAt = table.Column<DateTime>(nullable: false),
                    UpdateAt = table.Column<DateTime>(nullable: false),
                    DataEntrada = table.Column<DateTime>(nullable: false),
                    DataSaida = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<Guid>(nullable: true),
                    AmbienteId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Acesso", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Acesso_Ambiente_AmbienteId",
                        column: x => x.AmbienteId,
                        principalTable: "Ambiente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Acesso_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Acesso_AmbienteId",
                table: "Acesso",
                column: "AmbienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Acesso_UserId",
                table: "Acesso",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Acesso");

            migrationBuilder.DropTable(
                name: "Ambiente");
        }
    }
}
