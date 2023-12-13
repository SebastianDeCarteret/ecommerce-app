using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcommerceBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddBasketListToProductClass : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Basket_BasketId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_BasketId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "BasketId",
                table: "Product");

            migrationBuilder.CreateTable(
                name: "BasketProduct",
                columns: table => new
                {
                    BasketItemsId = table.Column<int>(type: "int", nullable: false),
                    BasketsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasketProduct", x => new { x.BasketItemsId, x.BasketsId });
                    table.ForeignKey(
                        name: "FK_BasketProduct_Basket_BasketsId",
                        column: x => x.BasketsId,
                        principalTable: "Basket",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BasketProduct_Product_BasketItemsId",
                        column: x => x.BasketItemsId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BasketProduct_BasketsId",
                table: "BasketProduct",
                column: "BasketsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BasketProduct");

            migrationBuilder.AddColumn<int>(
                name: "BasketId",
                table: "Product",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_BasketId",
                table: "Product",
                column: "BasketId");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Basket_BasketId",
                table: "Product",
                column: "BasketId",
                principalTable: "Basket",
                principalColumn: "Id");
        }
    }
}
