namespace EcommerceBackend.Models
{
    public class Order
    {
        public int Id { get; init; }
        public int UserId { get; init; }
        public List<Product> Products { get; set; } = [];
        public DateOnly OrderDate { get; set; }
    }
}
