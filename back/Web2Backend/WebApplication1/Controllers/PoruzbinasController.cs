using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
    [Authorize]
    public class PoruzbinasController : ControllerBase
    {
        private readonly CRUD_PorudzbinaContext _context;
        public PoruzbinasController(CRUD_PorudzbinaContext context)
        {
            _context = context;
        }

        // GET: api/Poruzbinas
        
        [HttpGet]
        //[Authorize(Roles ="admin")]
        [AllowAnonymous]
      
        public async Task<ActionResult<IEnumerable<Poruzbina>>> GetPoruzbinas()
        {
            return await _context.Poruzbinas.ToListAsync();
        }

        [HttpGet("/zaDostavu")]
        [Authorize(Roles = "dostavljac")]
        public async Task<ActionResult<IEnumerable<Poruzbina>>> GetzaDostavu()
        {
            return await _context.Poruzbinas.Where(t => t.Stanje == 0).ToListAsync();
            /*
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity == null)
            {
                return Unauthorized();
            }

            string id = identity.FindFirst(ClaimTypes.Email).Value;

            var abc = _context.Poruzbinas.FirstOrDefaultAsync(t => t.Stanje == StanjeDostave.dispatching && t.Dostavljac == id);
            

            if (abc==null)
            {
               
             
            }

            return NoContent();
            */

        }



        [HttpGet("/zauzetDostavljac")]
        [Authorize(Roles = "dostavljac")]
        [Authorize(Roles ="potrosac")]
        public async Task<ActionResult<IEnumerable<Poruzbina>>> ProverazaDostavu()
        {
            
            
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity == null)
            {
                return Unauthorized();
            }

            string uloga = identity.FindFirst(ClaimTypes.Role).Value;

            if (uloga == null)
            {
                return Unauthorized();
            }
            else if (uloga == "dostavljac")
            {
                string id = identity.FindFirst(ClaimTypes.Email).Value;

                var abc = await _context.Poruzbinas.FirstOrDefaultAsync(t => t.Stanje == StanjeDostave.dispatching && t.Dostavljac == id);

                if (abc != null)
                {
                    return Ok(true);

                }
                else
                {
                    return Ok(false);
                }
            }
            else if(uloga == "potrosac")
            {
                string id = identity.FindFirst(ClaimTypes.Email).Value;

                var abc = await _context.Poruzbinas.FirstOrDefaultAsync(t => t.Stanje == StanjeDostave.dispatching && t.IdKorisnika == id);

                if (abc != null)
                {
                    return Ok(true);

                }
                else
                {
                    return Ok(false);
                }
            }
            else
            {
                return Unauthorized();
            }
     

        }


        // GET: api/Poruzbinas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Poruzbina>> GetPoruzbina(int id)
        {
            var poruzbina = await _context.Poruzbinas.FindAsync(id);

            if (poruzbina == null)
            {
                return NotFound();
            }

            return poruzbina;
        }


        [HttpGet("sveMoje")]
        public async Task<ActionResult<IEnumerable<Poruzbina>>> sveMoje()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity == null)
            {
                return Unauthorized();
            }



            string role = identity.FindFirst(ClaimTypes.Role).Value;
            string username = identity.FindFirst(ClaimTypes.Email).Value;

           

            if (role == "potrosac")
            {
                var porudzbinePotrosac = await _context.Poruzbinas.Where(t => t.IdKorisnika == username).ToListAsync();
                if(porudzbinePotrosac == null)
                {
                    return NotFound();
                }
                else
                {
                    return porudzbinePotrosac;
                }
            }

            var porudzbineDostavljac = await _context.Poruzbinas.Where(t => t.Dostavljac == username).ToListAsync();
            
            //var porudzbina = await _context.Poruzbinas.Where(t => t.IdKorisnika == username && t.Stanje == StanjeDostave.waiting).FirstOrDefault();

            if (porudzbineDostavljac == null)
            {
                return NotFound();
            }

            return porudzbineDostavljac;
        }





        [HttpGet("/dobaviMoju")]
       
        public async Task<ActionResult<Poruzbina>> dobaviMoju()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity == null)
            {
                return Unauthorized();
            }



            string role = identity.FindFirst(ClaimTypes.Role).Value;
            string username = identity.FindFirst(ClaimTypes.Email).Value;

            var porudzbina = new Poruzbina();
            
            if(role=="potrosac")
            {
                porudzbina = await _context.Poruzbinas.SingleOrDefaultAsync(t => t.IdKorisnika == username && t.Stanje == StanjeDostave.waiting || t.IdKorisnika == username && t.Stanje == StanjeDostave.dispatching);

            }
            else
            {
                 porudzbina = await _context.Poruzbinas.SingleOrDefaultAsync(t => t.Dostavljac == username && t.Stanje == StanjeDostave.dispatching);
            }
            //var porudzbina = await _context.Poruzbinas.Where(t => t.IdKorisnika == username && t.Stanje == StanjeDostave.waiting).FirstOrDefault();

            if (porudzbina == null)
            {
                return NotFound();
            }

            return porudzbina;
        }




        // PUT: api/Poruzbinas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "dostavljac")]
       
        public async Task<IActionResult> PutPoruzbina(int id, Poruzbina poruzbina)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if(identity ==null)
            {
                return Unauthorized();
            }

            poruzbina.Dostavljac = identity.FindFirst(ClaimTypes.Email).Value;
            
            if (id != poruzbina.IdDostave)
            {
                return BadRequest();
            }

            _context.Entry(poruzbina).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PoruzbinaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Poruzbinas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Poruzbina>> PostPoruzbina(Poruzbina poruzbina)
        {
            _context.Poruzbinas.Add(poruzbina);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPoruzbina", new { id = poruzbina.IdDostave }, poruzbina);
        }

        // DELETE: api/Poruzbinas/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        
        public async Task<IActionResult> DeletePoruzbina(int id)
        {
            var poruzbina = await _context.Poruzbinas.FindAsync(id);
            if (poruzbina == null)
            {
                return NotFound();
            }

            _context.Poruzbinas.Remove(poruzbina);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PoruzbinaExists(int id)
        {
            return _context.Poruzbinas.Any(e => e.IdDostave == id);
        }
    }
}
