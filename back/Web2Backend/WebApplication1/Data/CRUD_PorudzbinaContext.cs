using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class CRUD_PorudzbinaContext : DbContext
    {
        public CRUD_PorudzbinaContext(DbContextOptions<CRUD_PorudzbinaContext> options) : base(options)
        {

        }
        public DbSet<Poruzbina> Poruzbinas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Poruzbina>().Property(p => p.Proizvods).HasConversion(
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<List<ProizvodPorudzbina>>(v));
        }

    }
}

