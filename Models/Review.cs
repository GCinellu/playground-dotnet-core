using Microsoft.AspNetCore.Identity;

namespace BestWifiWorkplace.Models
{
    public class Review
    {
        public long Id { get; set; }
        public string Content { get; set; }
        
        public long WorkplaceId { get; set; }
        public Workplace Workplace { get; set; }
        
        public long UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}