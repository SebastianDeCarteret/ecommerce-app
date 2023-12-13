using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcommerceBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNameOfId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Review_Product_Productid",
                table: "Review");

            migrationBuilder.RenameColumn(
                name: "Productid",
                table: "Review",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Review_Productid",
                table: "Review",
                newName: "IX_Review_ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Product_ProductId",
                table: "Review",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Review_Product_ProductId",
                table: "Review");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Review",
                newName: "Productid");

            migrationBuilder.RenameIndex(
                name: "IX_Review_ProductId",
                table: "Review",
                newName: "IX_Review_Productid");

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Product_Productid",
                table: "Review",
                column: "Productid",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
