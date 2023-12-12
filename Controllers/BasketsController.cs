using EcommerceBackend.Data;
using EcommerceBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketsController : ControllerBase
    {
        private readonly EcommerceBackendContext _context;

        public BasketsController(EcommerceBackendContext context)
        {
            _context = context;
        }

        // GET: api/Baskets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Basket>>> GetBasket()
        {
            return await _context.Basket
                .Include(basket => basket.BasketItems)
                .ToListAsync();
        }

        // GET: api/Baskets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Basket>> GetBasket(int id)
        {
            var _ = await _context.Basket
                .Include(basket => basket.BasketItems)
                .ToListAsync();
            var basket = _.Find(basket => basket.Id == id);

            if (basket == null)
            {
                return NotFound();
            }

            return basket;
        }

        // PATCH: api/Baskets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch("{userId}/{productId}")]
        public async Task<ActionResult<Basket>> PatchBasket(int userId, int productId)
        {
            var _ = await _context.User.Include(basket => basket.Basket).ToListAsync();
            var basket = _.Find(basket => basket.Basket.UserId == userId).Basket;

            basket.BasketItems.Add(_context.Product.Find(productId));
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBasket", new { id = basket.Id }, basket);
        }

        // DELETE: api/Baskets/5
        [HttpDelete("{userId}/{productId}")]
        public async Task<IActionResult> DeleteBasket(int userId, int productId)
        {

            var _ = await _context.User.Include(basket => basket.Basket).ToListAsync();
            var basket = _.Find(basket => basket.Basket.UserId == userId).Basket;

            basket.BasketItems.Remove(_context.Product.Find(productId));

            if (basket == null)
            {
                return NotFound();
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
