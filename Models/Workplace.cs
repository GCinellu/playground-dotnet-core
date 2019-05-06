using System.ComponentModel.DataAnnotations;

namespace BestWifiWorkplace.Models
{
    public class Workplace

    {
        public long Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        
        [Required]
        public string Address { get; set; }
        
        [Required]
        [Range(minimum: 1, maximum: 5)]
        public int Rate { get; set; }
    }
}