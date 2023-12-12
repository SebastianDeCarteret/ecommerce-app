namespace EcommerceBackend.Models
{
    public class Review
    {
        public int Id { get; init; }
        public int ProductId { get; init; }
        public int Rating { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
