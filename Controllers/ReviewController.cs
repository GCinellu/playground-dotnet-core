using System.Collections;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using BestWifiWorkplace.Data;
using BestWifiWorkplace.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BestWifiWorkplace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workplace>>> GetWorkplaces()
        {
            return await _context.Workplaces.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(long id)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetReview), 
                new {id = review.Id},
                review
            );
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> PutWorkplace(long id, Workplace workplace)
        {
            if (id != workplace.Id)
            {
                return BadRequest();
            }

            _context.Entry(workplace).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}