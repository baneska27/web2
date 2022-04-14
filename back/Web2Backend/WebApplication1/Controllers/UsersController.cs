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

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CRUD_UserContext _context;
        private readonly IEmailSender _emailSender; 

        public UsersController(CRUD_UserContext context,IEmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            
            return await _context.Users.ToListAsync();
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

        public async Task<ActionResult<string>> Authenticate(User userParam) // User user
        {


            var user = await _context.Users.FindAsync(userParam.Email);
            
            
         

            string hashedPass = EasyEncryption.MD5.ComputeMD5Hash(userParam.Password);

            bool validPassword = BCrypt.Net.BCrypt.Verify(userParam.Password, user.Password);

            


            if (user == null)
            {
                return BadRequest(new { message = "Username or password not valid" });
            }


            

            //else if(!userr.Password.Equals(user.Password))
            else
            {
                
                if(validPassword == false)
                {
                    return BadRequest(new { message = "Username or password not valid" });
                }
                else
                {
                    return Ok(user);
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



    }

