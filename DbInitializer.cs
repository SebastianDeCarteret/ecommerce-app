using EcommerceBackend.Data;
using EcommerceBackend.Migrations;
using EcommerceBackend.Models;
using System.Drawing;

namespace EcommerceBackend
{
    internal class DbInitializer
    {
        async internal static void Initialize(EcommerceBackendContext dbContext)
        {
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();
            await dbContext.SaveChangesAsync();

            //dbContext.AddRange(SeedData.SeedDataList);
            //dbContext.AddRange(SeedData.Bands);
            //dbContext.AddRange(SeedData.Artists);

            await dbContext.AddRangeAsync([
                new Category
                {
                    CategoryType = "test1",
                },
                new Category
                {
                    CategoryType = "test2",
                }
            ]);

            await dbContext.AddRangeAsync([new Product
            {
                Name = "product1",
                Colour = "black",
                Description = "product1",
                Price = 0f,
                ImageUrl = "https://picsum.photos/500/300?random=1"
            },
                new Product
                {
                    Name = "product2",
                    Colour = "black",
                    Description = "product2",
                    Price = 0f,
                    ImageUrl = "https://picsum.photos/500/300?random=1"
                },
                new Product
                {
                    Name = "product3",
                    Colour = "black",
                    Description = "product3",
                    Price = 0f,
                    ImageUrl = "https://picsum.photos/500/300?random=1"
                }
            ]);

            await dbContext.AddRangeAsync([
                new User
                {
                    FirstName = "test1",
                    LastName = "test1",
                    Username = "test1",
                    Gender = "test",
                    Password = "test1"
                },
                new User
                {
                    FirstName = "test2",
                    LastName = "test2",
                    Username = "test2",
                    Gender = "test",
                    Password = "test2"
                }

            ]);
            //await dbContext.AddRangeAsync([
            //    new Review
            //    {
            //        Title = "Review1",
            //        Description = "Review1",
            //        Rating = 10,
            //        ProductId = 1,
            //        UserId = 1
            //    },
            //new Review
            //{
            //    Title = "Review2",
            //    Description = "Review2",
            //    Rating = 10,
            //},
            //new Review
            //{
            //    Title = "Review3",
            //    Description = "Review3",
            //    Rating = 10,
            //    User = dbContext.User.Find(1),
            //    Product = dbContext.Product.Find(1)
            //}
            //]);

            dbContext.SaveChanges();



            //dbContext.User.Find(1).Basket.BasketItems.Add(dbContext.Product.Find(1));
            //dbContext.SaveChanges();
            //dbContext.User.Find(1).Basket.BasketItems.Add(dbContext.Product.Find(2));
            //dbContext.SaveChanges();
            //dbContext.User.Find(1).Basket.BasketItems.Add(dbContext.Product.Find(3));
            //dbContext.SaveChanges();
            //dbContext.User.Find(2).Basket.BasketItems.Add(dbContext.Product.Find(1));
            //dbContext.SaveChanges();
            //dbContext.User.Find(2).Basket.BasketItems.Add(dbContext.Product.Find(2));
            //dbContext.SaveChanges();


            dbContext.Product.Find(1).Category = dbContext.Category.Find(1);
            dbContext.SaveChanges();
            dbContext.Product.Find(2).Category = dbContext.Category.Find(1);
            dbContext.SaveChanges();
            dbContext.Product.Find(3).Category = dbContext.Category.Find(2);

            //dbContext.Product.Find(1).Reviews.AddRange([dbContext.Review.Find(1), dbContext.Review.Find(2)]);
            //dbContext.SaveChanges();
            //dbContext.Product.Find(2).Reviews.Add(dbContext.Review.Find(3));
            //dbContext.SaveChanges();

            //dbContext.Category.Find(1).Products.Add(dbContext.Product.Find(1));
            //dbContext.Category.Find(1).Products.Add(dbContext.Product.Find(2));

            dbContext.SaveChanges();

        }
    }
}
