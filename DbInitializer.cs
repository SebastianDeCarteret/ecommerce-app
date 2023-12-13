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
                Name = "test1",
                Colour = "test1",
                Description = "test1",
                Price = 0f,
                ImageUrl = "test"
            },
                new Product
                {
                    Name = "test2",
                    Colour = "test2",
                    Description = "test2",
                    Price = 0f,
                    ImageUrl = "test"
                },
                new Product
                {
                    Name = "test3",
                    Colour = "test3",
                    Description = "test3",
                    Price = 0f,
                    ImageUrl = "test"
                }
            ]);

            await dbContext.AddRangeAsync([
                new User
                {
                    FirstName = "test1",
                    LastName = "test1",
                    Username = "test",
                    Gender = "test",
                    Password = "test"
                },
                new User
                {
                    FirstName = "test2",
                    LastName = "test2",
                    Username = "test",
                    Gender = "test",
                    Password = "test"
                }

            ]);

            dbContext.SaveChanges();



            dbContext.User.Find(1).Basket.BasketItems.Add(dbContext.Product.Find(1));
            dbContext.SaveChanges();
            dbContext.User.Find(1).Basket.BasketItems.Add(dbContext.Product.Find(2));
            dbContext.SaveChanges();
            dbContext.User.Find(1).Basket.BasketItems.Add(dbContext.Product.Find(3));
            dbContext.SaveChanges();
            dbContext.User.Find(2).Basket.BasketItems.Add(dbContext.Product.Find(1));
            dbContext.SaveChanges();
            dbContext.User.Find(2).Basket.BasketItems.Add(dbContext.Product.Find(2));
            dbContext.SaveChanges();


            dbContext.Product.Find(1).Category = dbContext.Category.Find(1);
            dbContext.SaveChanges();
            dbContext.Product.Find(2).Category = dbContext.Category.Find(1);
            dbContext.SaveChanges();
            dbContext.Product.Find(3).Category = dbContext.Category.Find(2);

            //dbContext.Category.Find(1).Products.Add(dbContext.Product.Find(1));
            //dbContext.Category.Find(1).Products.Add(dbContext.Product.Find(2));

            dbContext.SaveChanges();

        }
    }
}
