using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{

    [Table("Slika")]
    public class Slika
    {

        [Column("Id")]
        [Key]
        public string Id { get; set; }

        [Column("Data")]
        public byte[] Data { get; set; }
    }
}
