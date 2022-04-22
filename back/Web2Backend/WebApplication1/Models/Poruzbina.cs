using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{

    public class ProizvodPorudzbina
    {
       
        public string Ime { get; set; }

        public double Cena { get; set; }

      
        public int Id { get; set; }

        public virtual List<Sastojak> Sastojaks { get; set; }

        public int Kolicina { get; set; }
        
    }

    public enum StanjeDostave
    {
        waiting=0,
        dispatching=1,
        dispatched=2
    }

    [Table("Porudzbina")]

    public class Poruzbina
    {
        [Column("Proizvods")]
        [Required]
        public virtual List<ProizvodPorudzbina> Proizvods { get; set; }

        [Column("Adresa")]
        [Required]

        public string Adresa { get; set; }

        [Column("Komentar")]
        [Required]

        public string Komentar { get; set; }

        [Column("Cena")]
        [Required]

        public int Cena { get; set; }

        [Column("IdKorisnika")]
        [Required]

        public string IdKorisnika { get; set; }

        [Column("IdDostave")]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int IdDostave { get; set; }

        [Column("StanjeDostave")]
        public StanjeDostave Stanje { get; set; }


        [Column("Dostavljac")]

        public string Dostavljac { get; set; }

    }
}
