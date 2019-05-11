using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace BestWifiWorkplace.Models
{
    public class Review
    {
        public long UserId { get; set; }
        public ApplicationUser User { get; set; }

        public string Title { get; set; }
        public long Id { get; set; }
        public string Content { get; set; }
        
        [Range(minimum: 1, maximum: 5)]
        public int Rating { get; set; }
        
        [Required]
        public long WorkplaceId { get; set; }
        public Workplace Workplace { get; set; }
        
        
        
        public DateTime CreatedAt { get; set; }
    }
}