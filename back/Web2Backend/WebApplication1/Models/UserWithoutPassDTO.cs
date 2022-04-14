using System;

namespace WebApplication1.Models
{
    public class UserWithoutPassDTO
    {
       
        public string Username { get; set; }
        
        public string Email { get; set; }

        public string Type { get; set; }
       
        public string FirstName { get; set; }
      
        public string SecondName { get; set; }

        
        public DateTime DateOfBirth { get; set; }

       
        public string Slika { get; set; }

       
        public string Address { get; set; }

       
        public bool Verified { get; set; }


        
    }
}
