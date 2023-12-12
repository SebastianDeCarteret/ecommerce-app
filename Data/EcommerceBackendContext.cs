using EcommerceBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceBackend.Data
{
    public class EcommerceBackendContext : DbContext
    {
        public EcommerceBackendContext(DbContextOptions<EcommerceBackendContext> options)
            : base(options)
        {
        }

        public DbSet<EcommerceBackend.Models.User> User { get; set; } = default!;
        public DbSet<EcommerceBackend.Models.Product> Product { get; set; } = default!;
    }
}
