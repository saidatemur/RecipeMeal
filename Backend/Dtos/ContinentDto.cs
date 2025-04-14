using System.ComponentModel.DataAnnotations;

namespace RecipeApiNew.Dtos
{
    public class ContinentDto
    {
        [Required(ErrorMessage = "Isim bos olamaz.")]
        [StringLength(50, ErrorMessage = "Isim 50 karakterden fazla olamaz.")]
        public required string Name { get; set; } 
    }
}
