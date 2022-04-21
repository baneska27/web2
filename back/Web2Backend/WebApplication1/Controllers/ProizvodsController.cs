using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProizvodsController : ControllerBase
    {
        private readonly CRUD_ProizvodContext _context;



        public ProizvodsController(CRUD_ProizvodContext context)
        {
            _context = context;
           
        }

        // GET: api/Proizvods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Proizvod>>> GetProizvods()
        {
            return await _context.Proizvods.ToListAsync();
        }


       



        // GET: api/Proizvods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Proizvod>> GetProizvod(int id)
        {
            var proizvod = await _context.Proizvods.FindAsync(id);

            if (proizvod == null)
            {
                return NotFound();
            }

            return proizvod;
        }

        // PUT: api/Proizvods/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]

        public async Task<IActionResult> PutProizvod(int id, Proizvod proizvod)
        {
            if (id != proizvod.Id)
            {
                return BadRequest();
            }

            _context.Entry(proizvod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProizvodExists(id))
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

        // POST: api/Proizvods
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "admin")]

        public async Task<ActionResult<Proizvod>> PostProizvod(Proizvod proizvod)
        {
            _context.Proizvods.Add(proizvod);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProizvod", new { id = proizvod.Id }, proizvod);
        }

        // DELETE: api/Proizvods/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]

        public async Task<IActionResult> DeleteProizvod(int id)
        {
            var proizvod = await _context.Proizvods.FindAsync(id);
            if (proizvod == null)
            {
                return NotFound();
            }

            _context.Proizvods.Remove(proizvod);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProizvodExists(int id)
        {
            return _context.Proizvods.Any(e => e.Id == id);
        }
    }
}
