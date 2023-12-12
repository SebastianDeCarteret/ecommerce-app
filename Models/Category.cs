namespace EcommerceBackend.Models
{
    public class Category
    {
        public int Id { get; init; }
        public string CategoryType { get; set; }
        public List<Product>? Products { get; set; } = null!;
    }
}
