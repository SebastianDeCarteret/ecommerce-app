using EcommerceBackend.Data;
using EcommerceBackend.Models;

namespace VinylDatabaseApi
{
    internal class DbInitializer
    {
        internal static void Initialize(EcommerceBackendContext dbContext)
        {
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();
            dbContext.SaveChanges();

            //dbContext.AddRange(SeedData.SeedDataList);
            //dbContext.AddRange(SeedData.Bands);
            //dbContext.AddRange(SeedData.Artists);

            dbContext.AddRange(new List<User>([
                new User
                {
                    FirstName = "test",
                    LastName = "test",
                    Username = "test",
                    Gender = "test",
                    Password = "test"
                },
                new User
                {
                    FirstName = "test",
                    LastName = "test",
                    Username = "test",
                    Gender = "test",
                    Password = "test",
                    //Basket = [new Product
                    //{
                    //    Name = "test",
                    //    Colour = "test",
                    //    Description = "test",
                    //    Price = 0f,
                    //    ImageUrl = "test",
                    //    Category = new Category
                    //    {
                    //        CategoryType = "test",
                    //    }
                    //}]
                }

            ]));

            dbContext.AddRange(new Product
            {
                Name = "test",
                Colour = "test",
                Description = "test",
                Price = 0f,
                ImageUrl = "test",
                Category = new Category
                {
                    CategoryType = "test",
                }
            });

            dbContext.SaveChanges();
        }
    }
}
