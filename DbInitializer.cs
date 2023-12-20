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
                    CategoryType = "Phones",
                },
                new Category
                {
                    CategoryType = "Tvs",
                },
                new Category
                {
                    CategoryType = "Laptops",
                }
            ]);

            await dbContext.AddRangeAsync([new Product
            {
                Name = "Pixel 8 Pro",
                Colour = "black",
                Description = "What makes the Pixel 8 Pro tick? Its Google's custom-designed Tensor G3 chip. And it ticks fast. That's what enables clever AI features like Live Translate, Photo Unblur and Magic Eraser. So, you can say adios to imperfect photos. Should be easy enough with the 50 MP triple camera system on the back. You can choose from 3 lenses – ultra-wide, wide, and telephoto – so you'll have the best photos around. Far and wide. Your snaps (and everything else) will look amazing on the 6.7\" pOLED display. And since it runs at a 120 Hz refresh rate, you're in for some satisfyingly smooth swiping.",
                Price = 999.00f,
                ImageUrl = "https://www.bing.com/th?id=OPE.k30%2fvsftLO%2fi8A300C300&pid=21.1&w=142&h=142&qlt=100&dpr=1"
            },
                new Product
                {
                    Name = "TCL 50RP630K Roku TV 50\" Smart 4K Ultra HD HDR LED TV",
                    Colour = "black",
                    Description = "Get comfy, grab some snacks, and enjoy a movie night or the cup final with this TCL 4K TV. You'll love how good it all looks with HDR technology. Dolby Vision brings brighter brights, deeper darks, and a wider range of colours. With HDR10, every scene is perfectly framed with brilliant details and rich colours. Streaming your favourite shows is easy with Roku TV. With access to over 150,000 movies and TV shows from the likes of BBC iPlayer, Netflix, Prime Video, Apple TV, and NOW TV, you'll never be stuck for anything to watch again. Everything you need is on the home screen with quick customistable access to your favourite apps, live TV, and connected devices like games consoles.",
                    Price = 299.99f,
                    ImageUrl = "https://www.bing.com/th?id=OPE.5P%2bFyetx3JOcxw300C300&pid=21.1&w=142&h=142&qlt=100&dpr=1"
                },
                new Product
                {
                    Name = "SAMSUNG Galaxy Book3 15.6\" Laptop - Intel® Core™ i5, 256 GB SSD, Graphite",
                    Colour = "grey",
                    Description = "Don't let the looks of the Galaxy Book 3 fool you. Hiding inside this ultra-thin and lightweight laptop is a powerful 13th gen Intel® Core™ i5 processor. Together with the Intel® Iris® Xe graphics, they can blow through productivity task, creative work and even gaming. Its 15.6\" Full HD screen is big, sharp and bright enough, so you can work comfortably wherever you are. And with up to 13 hours of battery life, you don't even need to worry about finding a plug.",
                    Price = 154.99f,
                    ImageUrl = "https://www.bing.com/th?id=OPE.ll1TyciK2rzTVQ300C300&pid=21.1&w=142&h=142&qlt=100&dpr=1"
                }
            ]);

            await dbContext.AddRangeAsync([
                new User
                {
                    FirstName = "Sebastian",
                    LastName = "De Carteret",
                    Username = "seb",
                    Gender = "male",
                    Password = "seb"
                },
                new User
                {
                    FirstName = "Bobby",
                    LastName = "Clive",
                    Username = "bob",
                    Gender = "male",
                    Password = "bob"
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
            dbContext.Product.Find(2).Category = dbContext.Category.Find(2);
            dbContext.SaveChanges();
            dbContext.Product.Find(3).Category = dbContext.Category.Find(3);

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
