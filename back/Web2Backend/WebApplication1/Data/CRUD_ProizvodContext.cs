using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class CRUD_ProizvodContext : DbContext
    {
        public CRUD_ProizvodContext(DbContextOptions<CRUD_ProizvodContext> options) : base(options)
        {

        }
        public DbSet<Proizvod> Proizvods { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Proizvod>().Property(p => p.Sastojaks).HasConversion(
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<List<Sastojak>>(v));
        }

        }
    }
