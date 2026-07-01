using System.ComponentModel.DataAnnotations;

namespace RecipeApiNew.Dtos
{
    public class MealTypeDto
    {
        [Required]
        [StringLength(50)]
        public required string Name { get; set; }
    }
}
