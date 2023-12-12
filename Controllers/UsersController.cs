using EcommerceBackend.Data;
using EcommerceBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mono.TextTemplating;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly EcommerceBackendContext _context;

        public UsersController(EcommerceBackendContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.Include(user => user.Basket).ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int userId)
        {
            var _ = await _context.User.Include(user => user.Basket).ToListAsync();
            var user = _.Find(user => user.Id == userId);

            //_context.User.Find(userId).Basket.Add(new Product
            //{
            //    Name = "test",
            //    Colour = "test",
            //    Description = "test",
            //    Price = 0f,
            //    ImageUrl = "test",
            //    Category = new Category
            //    {
            //        CategoryType = "test",
            //    }
            //});

            //user.Basket.Add(new Product
            //{
            //    Name = "test",
            //    Colour = "test",
            //    Description = "test",
            //    Price = 0f,
            //    ImageUrl = "test",
            //    Category = new Category
            //    {
            //        CategoryType = "test",
            //    }
            //});
            //await _context.SaveChangesAsync();

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{userId}/{productId}")]
        public async Task<IActionResult> PutUser(int userId, int productId)
        {
            //if (id != user.Id)
            //{
            //    return BadRequest();
            //}

            //_context.Entry(user).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!UserExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            _context.User.Find(userId).Basket.Add(_context.Product.Find(productId));

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }
    }
}
