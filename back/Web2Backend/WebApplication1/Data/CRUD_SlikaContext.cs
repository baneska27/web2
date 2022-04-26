using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class CRUD_SlikaContext : DbContext
    {
        public CRUD_SlikaContext(DbContextOptions<CRUD_SlikaContext> options) : base(options)
        {

        }
        public DbSet<Slika> Slikas { get; set; }

    }
}
