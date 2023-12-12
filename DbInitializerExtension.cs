using EcommerceBackend.Data;

namespace VinylDatabaseApi
{
    internal static class DbInitializerExtension
    {
        public static IApplicationBuilder UseItToSeedSqlServer(this IApplicationBuilder app)
        {
            //ArgumentNullException.ThrowIfNull(app, nameof(app));

            using var scope = app.ApplicationServices.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                var context = services.GetRequiredService<EcommerceBackendContext>();
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                context.SaveChanges();
                DbInitializer.Initialize(context);
            }
            catch (Exception ex)
            {
            }

            return app;
        }
    }
}
