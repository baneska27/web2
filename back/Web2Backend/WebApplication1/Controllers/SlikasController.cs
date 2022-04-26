using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlikasController : ControllerBase
    {
        private readonly CRUD_SlikaContext _context;

        public SlikasController(CRUD_SlikaContext context)
        {
            _context = context;
        }

        // GET: api/Slikas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Slika>>> GetSlikas()
        {
            return await _context.Slikas.ToListAsync();
        }

        // GET: api/Slikas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Slika>> GetSlika(string id)
        {
            var slika = await _context.Slikas.FindAsync(id);

            if (slika == null)
            {
                return NotFound();
            }

            return slika;
        }

        // PUT: api/Slikas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        
        public async Task<IActionResult> PutSlika()
        {

            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity == null)
            {
                return Unauthorized();
            }


            string username = identity.FindFirst(ClaimTypes.Email).Value;

            Slika slika = new Slika();

            if (Request.Form.Files.Count > 0)
            {
                
                var file = Request.Form.Files[0];
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    slika.Data = stream.ToArray();
                    slika.Id = username;
                }
            }


            _context.Entry(slika).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SlikaExists(slika.Id))
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

        // POST: api/Slikas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Slika>> PostSlika()
        {
            Slika slika = new Slika();

            if(Request.Form.Files.Count>0)
            {
                string id = Request.Form["id"];
                var file = Request.Form.Files[0];
                using(var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    slika.Data = stream.ToArray();
                    slika.Id = id;
                }
            }

      
           
            _context.Slikas.Add(slika);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SlikaExists(slika.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSlika", new { id = slika.Id }, slika);
        }

        // DELETE: api/Slikas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSlika(string id)
        {
            var slika = await _context.Slikas.FindAsync(id);
            if (slika == null)
            {
                return NotFound();
            }

            _context.Slikas.Remove(slika);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SlikaExists(string id)
        {
            return _context.Slikas.Any(e => e.Id == id);
        }
    }
}
