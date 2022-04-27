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
using System.Net.Http;
using System.Net;
using Newtonsoft.Json;

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

            if(user1==null)
            {
                return NoContent();
            }

            UserWithoutPassDTO user = new UserWithoutPassDTO()
            {
                Address = user1.Address,
                Username = user1.Username,
                Email = user1.Email,
                DateOfBirth = user1.DateOfBirth,
                FirstName = user1.FirstName,
                SecondName = user1.SecondName,
               
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




        [HttpPost]
        [Route("SocialLogin")]
        [AllowAnonymous]
        
        // POST: api/<controller>/Login
        public async Task<IActionResult> SocialLogin([FromBody] GoogleLoginModel loginModel)
        {

            if (VerifyToken(loginModel.IdToken))
            {

               

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Email,loginModel.Email),
                        new Claim(ClaimTypes.Role, "potrosac")
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    Issuer=  "https://localhost:44332",
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value)), SecurityAlgorithms.HmacSha256Signature)
                };
                
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }

            return Ok();
        }
        private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";

        private bool VerifyToken(string providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, providerToken));

            HttpResponseMessage httpResponseMessage;

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch (Exception ex)
            {
                return false;
            }

            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);

            return true;
        }





    }


    public class GoogleApiTokenInfo
    {
        /// <summary>
        /// The Issuer Identifier for the Issuer of the response. Always https://accounts.google.com or accounts.google.com for Google ID tokens.
        /// </summary>
        public string iss { get; set; }

        /// <summary>
        /// Access token hash. Provides validation that the access token is tied to the identity token. If the ID token is issued with an access token in the server flow, this is always
        /// included. This can be used as an alternate mechanism to protect against cross-site request forgery attacks, but if you follow Step 1 and Step 3 it is not necessary to verify the 
        /// access token.
        /// </summary>
        public string at_hash { get; set; }

        /// <summary>
        /// Identifies the audience that this ID token is intended for. It must be one of the OAuth 2.0 client IDs of your application.
        /// </summary>
        public string aud { get; set; }

        /// <summary>
        /// An identifier for the user, unique among all Google accounts and never reused. A Google account can have multiple emails at different points in time, but the sub value is never
        /// changed. Use sub within your application as the unique-identifier key for the user.
        /// </summary>
        public string sub { get; set; }

        /// <summary>
        /// True if the user's e-mail address has been verified; otherwise false.
        /// </summary>
        public string email_verified { get; set; }

        /// <summary>
        /// The client_id of the authorized presenter. This claim is only needed when the party requesting the ID token is not the same as the audience of the ID token. This may be the
        /// case at Google for hybrid apps where a web application and Android app have a different client_id but share the same project.
        /// </summary>
        public string azp { get; set; }

        /// <summary>
        /// The user's email address. This may not be unique and is not suitable for use as a primary key. Provided only if your scope included the string "email".
        /// </summary>
        public string email { get; set; }

        /// <summary>
        /// The time the ID token was issued, represented in Unix time (integer seconds).
        /// </summary>
        public string iat { get; set; }

        /// <summary>
        /// The time the ID token expires, represented in Unix time (integer seconds).
        /// </summary>
        public string exp { get; set; }

        /// <summary>
        /// The user's full name, in a displayable form. Might be provided when:
        /// The request scope included the string "profile"
        /// The ID token is returned from a token refresh
        /// When name claims are present, you can use them to update your app's user records. Note that this claim is never guaranteed to be present.
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// The URL of the user's profile picture. Might be provided when:
        /// The request scope included the string "profile"
        /// The ID token is returned from a token refresh
        /// When picture claims are present, you can use them to update your app's user records. Note that this claim is never guaranteed to be present.
        /// </summary>
        public string picture { get; set; }

        public string given_name { get; set; }

        public string family_name { get; set; }

        public string locale { get; set; }

        public string alg { get; set; }

        public string kid { get; set; }
    }

    public class GoogleLoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string IdToken { get; set; }
    }

    public class UserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

