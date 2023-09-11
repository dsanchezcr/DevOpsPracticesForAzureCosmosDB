using Microsoft.EntityFrameworkCore;

namespace WebApp.Data
{
    public class WebAppContext : DbContext
    {
        public WebAppContext (DbContextOptions<WebAppContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<WebApp.Models.Item> Item { get; set; } = default!;
    }
}