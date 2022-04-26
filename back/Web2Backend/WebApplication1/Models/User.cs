using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{

    [Table("User")]
    public class User
    {
        [Column("Username")]
        
        [Required]
        public string Username { get; set; }
        [Column("Email")]
        [Required]
         [Key]
        public string Email { get ; set; }

        [Column("Password")]
        [Required]
        public string Password { get ; set ; }
        [Column("Type")]
        [Required]
        public string Type { get ; set; }
        [Column("FirstName")]
        public string FirstName { get; set; }
        [Column("SecondName")]
        public string SecondName { get ; set ; }

        [Column("DateOfBirth")]
        public DateTime DateOfBirth { get ; set; }



        [Column("Address")]
        public string Address { get; set; }

        [Column("Verified")]
        public bool Verified { get; set; }


        public User(string username, string email, string password, string type, string firstName, string secondName, DateTime dateOfBirth,string address, bool verified)
        {
            this.Username = username;
            this.Email = email;
            this.Password = password;
            this.Type = type;
            this.FirstName = firstName;
            this.SecondName = secondName;
            this.DateOfBirth = dateOfBirth;
            this.Address = address;
            this.Verified = verified;
        }

    }
}
