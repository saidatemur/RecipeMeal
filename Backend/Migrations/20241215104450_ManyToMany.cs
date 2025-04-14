using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeApi.Migrations
{
    /// <inheritdoc />
    public partial class ManyToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TriedList",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Meals",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CountryMealType",
                columns: table => new
                {
                    CountriesCountryId = table.Column<int>(type: "int", nullable: false),
                    MealTypesMealTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CountryMealType", x => new { x.CountriesCountryId, x.MealTypesMealTypeId });
                    table.ForeignKey(
                        name: "FK_CountryMealType_Countries_CountriesCountryId",
                        column: x => x.CountriesCountryId,
                        principalTable: "Countries",
                        principalColumn: "CountryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CountryMealType_MealTypes_MealTypesMealTypeId",
                        column: x => x.MealTypesMealTypeId,
                        principalTable: "MealTypes",
                        principalColumn: "MealTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Meals_UserId",
                table: "Meals",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CountryMealType_MealTypesMealTypeId",
                table: "CountryMealType",
                column: "MealTypesMealTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Users_UserId",
                table: "Meals",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Users_UserId",
                table: "Meals");

            migrationBuilder.DropTable(
                name: "CountryMealType");

            migrationBuilder.DropIndex(
                name: "IX_Meals_UserId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Meals");

            migrationBuilder.AddColumn<string>(
                name: "TriedList",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
