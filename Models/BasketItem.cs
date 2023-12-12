namespace EcommerceBackend.Models
{
    public class BasketItem : Product
    {
        public int Id { get; init; }
        //public int UserID { get; init; }
        //public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
