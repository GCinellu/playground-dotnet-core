using System;
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
    public class WorkplacesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WorkplacesController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workplace>>> GetWorkplaces()
        {
            return await _context.Workplaces.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Workplace>> GetWorkplace(long id)
        {
            var workplace = await _context.Workplaces.FindAsync(id);

            if (workplace == null)
            {
                return NotFound();
            }

            return workplace;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Workplace>> PostWorkplace(Workplace workplace)
        {
            workplace.CreatedAt = DateTime.Now;
            
            _context.Workplaces.Add(workplace);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetWorkplace), 
                new {id = workplace.Id},
                workplace
            );
        }

        [Authorize]
        [HttpPost("{id}/reviews")]
        public async Task<ActionResult<Review>> PostWorkplaceReview(long workplaceId, Review review)
        {
            review.CreatedAt = DateTime.Now;
            review.WorkplaceId = workplaceId;

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetWorkplace), 
                new {id = workplaceId},
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
            
            workplace.UpdatedAt = DateTime.Now;

            _context.Entry(workplace).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}