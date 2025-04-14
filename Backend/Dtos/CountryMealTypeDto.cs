using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApi
{
    public class CountryMealTypeDto
    {
        [Required(ErrorMessage = "MealType Gereklidir")]
        public int MealTypeId { get; set; }
    }
}