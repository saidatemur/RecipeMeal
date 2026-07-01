using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using RecipeApi.Services;
namespace RecipeApi.Models{
    public class Meal
    {
        public int MealId { get; set; }
        public required string Name { get; set; }
        public required string Recipe { get; set; }
        public required string ImageUrl { get; set; }
        public required string VideoUrl { get; set; }
        public int MealTypeId { get; set; }
        public int CountryId { get; set; }
        public virtual required MealType MealType { get; set; }
        public virtual required Country Country { get; set; }
    }
}