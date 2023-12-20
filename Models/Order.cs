namespace EcommerceBackend.Models
{
    public class Order
    {
        public int Id { get; init; }
        public User? User { get; set; }
        public List<Product> Products { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
