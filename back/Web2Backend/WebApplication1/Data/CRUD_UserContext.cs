using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class CRUD_UserContext : DbContext
    {
        public CRUD_UserContext(DbContextOptions<CRUD_UserContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
    }
}
