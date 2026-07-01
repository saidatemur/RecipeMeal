using System.ComponentModel.DataAnnotations;
namespace RecipeApi.Dtos
{
    public class UserDto
        {   
            [Required]
            [StringLength(50)]
            public required string Username { get; set; }        

            [Required]
            [MinLength(6)]
            public required string Password { get; set; }
            
            [Required(ErrorMessage = "Şifre alanı gereklidir")]
            [Compare("Password", ErrorMessage = "Şifreler birbiri ile uyuşmamaktadır")]
            public required string ConfirmPassword { get; set; }
        }
}        