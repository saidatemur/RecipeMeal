using System.ComponentModel.DataAnnotations;

namespace RecipeApiNew.Dtos
{
    public class CountryDto
    {
        [Required]
        [StringLength(50)]
        public required string Name { get; set; } 

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Kita idsi pozitif olmali")]
        public int ContinentId { get; set; }
    }
}
