using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;

namespace EcommerceBackend.Models
{
    public class User
    {
        public int Id { get; init; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public string Password { get; set; }
        //public List<Product>? Basket { get; set; } = new();
        public Basket Basket { get; set; } = new();
        public List<Order>? Orders { get; set; } = new();
        public bool IsLoggedIn { get; set; } = false;
    }
}
