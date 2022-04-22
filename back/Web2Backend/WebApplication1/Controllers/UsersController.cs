using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using EmailService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly CRUD_UserContext _context;
        private readonly IEmailSender _emailSender;
        private readonly IConfigurationSection _secretKey;


        public UsersController(CRUD_UserContext context,IEmailSender emailSender, IConfiguration config)
        {
            _context = context;
            _emailSender = emailSender;
            _secretKey = config.GetSection("SecretKey");
        }

        // GET: api/Users
        [HttpGet]
        [Authorize(Roles = "admin")]
        
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            
            return await _context.Users.ToListAsync();
        }


        [HttpGet("refreshUser")]
        
        public async Task<ActionResult<UserWithoutPassDTO>> GetUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if(identity==null)
            {
                return Unauthorized();
            }

            string id = identity.FindFirst(ClaimTypes.Email).Value;
            var user1 = await _context.Users.FindAsync(id);

            UserWithoutPassDTO user = new UserWithoutPassDTO()
            {
                Address = user1.Address,
                Username = user1.Username,
                Email = user1.Email,
                DateOfBirth = user1.DateOfBirth,
                FirstName = user1.FirstName,
                SecondName = user1.SecondName,
                Slika = user1.Slika,
                Verified = user1.Verified,
                Type = user1.Type
            };

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }


        [HttpGet("/GetUsersNoPass")]
        
        public IQueryable<UserWithoutPassDTO> GetUsersNoPass()
        {
            var users = from b in _context.Users
                        select new UserWithoutPassDTO()
                        {
                            Username = b.Username,
                            Email = b.Email,
                            Address = b.Address,
                            DateOfBirth = b.DateOfBirth,
                            FirstName = b.FirstName,
                            SecondName = b.SecondName,
                            Slika = b.Slika,
                            Verified = b.Verified,
                            Type = b.Type

                        };

            return users;
        }



        

        // GET: api/Users/5
        [HttpGet("{id}")]
        
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, UserWithoutPassDTO userParam)
        {
            if (id != userParam.Email)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            user.Username = userParam.Username;
            user.Email = userParam.Email;
            user.Type = userParam.Type;
            user.FirstName = userParam.FirstName;
            user.SecondName = userParam.SecondName;
            user.DateOfBirth = userParam.DateOfBirth;
            user.Slika = userParam.Slika;
            user.Address = userParam.Address;
            user.Verified = userParam.Verified;



            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            string body = "You are ";
            if (user.Verified == true)
            {
                body += "verified succesfully. Welcome.";
            }
            else
            {
                body += "rejected to verification. Sorry.";
            }

            var message = new Message(new string[] { user.Email }, "Verification mail", body);

            _emailSender.SendEmail(message);


            return Ok(user);
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _context.Users.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Username))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.Username }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]

        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Username == id);
        }


        
      
        [HttpPost("authenticate")]
        [AllowAnonymous]

        public async Task<ActionResult<string>> Authenticate(UserDto userParam) // User user
        {

            var user = await _context.Users.FindAsync(userParam.Email);
            

            if (user == null)
            {
                return BadRequest(new { message = "Username or password not valid" });
                
            }

            else
            {
                string hashedPass = EasyEncryption.MD5.ComputeMD5Hash(userParam.Password);
                bool validPassword = validPassword = BCrypt.Net.BCrypt.Verify(userParam.Password, user.Password);


                if (validPassword == false)
                {
                    return BadRequest(new { message = "Username or password not valid" });
                }
                else
                {

                    List<Claim> claims = new List<Claim>();
                    claims.Add(new Claim(ClaimTypes.Email, userParam.Email));
                    if(user.Type=="admin")
                    {
                        claims.Add(new Claim(ClaimTypes.Role, "admin"));
                    }
                    else if(user.Type =="dostavljac")
                    {
                        claims.Add(new Claim(ClaimTypes.Role, "dostavljac"));

                    }
                    else
                    {
                        claims.Add(new Claim(ClaimTypes.Role, "potrosac"));

                    }
                    

                    SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokenOptions = new JwtSecurityToken(
                        issuer: "https://localhost:44332", //url servera koji je izdao token
                        claims: claims, //claimovi
                        expires: DateTime.Now.AddMinutes(20), //vazenje tokena u minutama
                        signingCredentials: signinCredentials //kredencijali 
                        
                    );
                    string tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                    return Ok(tokenString);

              
                }
               
            }

        
                
            }

    


        [HttpPut("pass/{id}")]
        public async Task<IActionResult> PutUserPass(string id, User user)
        {

            




            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);


            if (id != user.Email)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            


            return Ok(user);
        }





    }

    public class UserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

