using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{


    [Table("Proizvod")]
    public class Proizvod
    {
        [Column("Ime")]
        [Required]
        public string Ime { get; set; }

        [Column("Cena")]
        [Required]
        public double Cena { get; set; }

        [Column("Id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
    
        public virtual List<Sastojak> Sastojaks { get; set; }

       

    }

  
    
}
