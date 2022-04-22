using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class PorudzbinaDostavljacContext : DbContext
    {
        public PorudzbinaDostavljacContext(DbContextOptions<PorudzbinaDostavljacContext> options) : base(options)
        {

        }
        public DbSet<Poruzbina> Poruzbinas { get; set; }
        public DbSet<User> Dostavljacs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
