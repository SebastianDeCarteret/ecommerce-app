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
    public class OrdersController : ControllerBase
    {
        private readonly EcommerceBackendContext _context;

        public OrdersController(EcommerceBackendContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
            return await _context.Order
                .Include(order => order.User)
                .Include(order => order.Products)
                .ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{orderId}")]
        public async Task<ActionResult<Order>> GetOrder(int orderId)
        {
            var _ = await _context.Order
                .Include(order => order.User)
                .Include(order => order.Products)
                .ToListAsync();
            var order = _.Find(order => order.Id == orderId);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{reviewId}")]
        //public async Task<IActionResult> PutOrder(int reviewId, Order order)
        //{
        //    if (reviewId != order.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(order).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!OrderExists(reviewId))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        [HttpPatch("update/order/{orderId}/product/{productId}")]
        public async Task<ActionResult<Order>> AddProductToOrder(int orderId, int productId)
        {
            var order = _context.Order.Find(orderId);
            order.Products.Add(_context.Product.Find(productId));
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch("/add/order{userId}")]
        public async Task<ActionResult<Order>> CreateNewOrderWithProducts(int userId, int[] productIds)
        {
            var order = _context.Order.Add(new Order());
            order.Entity.OrderDate = DateTime.Now;
            order.Entity.User = _context.User.Find(userId);
            foreach (var product in productIds)
            {
                order.Entity.Products.Add(_context.Product.Find(product));
            }
            //order.Entity.Products.Add(_context.Product.Find(productIds));

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Entity.Id }, order.Entity);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{orderId}/{productIds}")]
        public async Task<IActionResult> DeleteOrder(int orderId, int[] productIds)
        {
            var order = await _context.Order.FindAsync(orderId);
            if (order == null)
            {
                return NotFound();
            }

            foreach (var product in productIds)
            {
                order.Products.Remove(_context.Product.Find(product));

            }
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Order.Any(e => e.Id == id);
        }
    }
}
