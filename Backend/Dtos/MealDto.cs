using System.ComponentModel.DataAnnotations;

namespace RecipeApiNew.Dtos
{
    public class MealDto
    {
        [Required]
        [StringLength(100)]
        public required string Name { get; set; }

        [Required]
        public required string Recipe { get; set; } 

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "MealTypeId pozitif olmali.")]
        public int MealTypeId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "CountryId pozitif olmali.")]
        public int CountryId { get; set; }

        [Url(ErrorMessage = "Geçerli bir ImageUrl sağlayın.")]
        public required string ImageUrl { get; set; }=string.Empty ;

        [Url(ErrorMessage = "Geçerli bir VideoUrl sağlayın.")]
        public required string VideoUrl { get; set; }=string.Empty ;
    }
}
