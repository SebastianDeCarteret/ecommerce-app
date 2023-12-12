namespace EcommerceBackend.Models
{
    public class Basket
    {
        public int Id { get; init; }
        public int UserId { get; init; }
        public List<Product>? BasketItems { get; set; } = new();
    }
}
