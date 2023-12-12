using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace EcommerceBackend.Models
{
    public class Product
    {
        public int Id { get; init; }

        [Required]
        public string Name { get; set; }

        [Required]
        public float Price { get; set; }

        [Required]
        public string Colour { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public bool IsInStock { get; set; }

        [Required]
        public string ImageUrl { get; set; }
        public List<Review>? Reviews { get; set; }
        public Category? Category { get; set; } = null!;

        //public List<Basket> Baskets { get; set; } = new();
    }
}