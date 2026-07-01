using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using RecipeApi.Services;
namespace RecipeApi.Models{
    public class MealType
    {
        public int MealTypeId { get; set; }
        public required string Name { get; set; }

        [JsonIgnore]
        public virtual List<Country> Countries { get; set; } = [];
        [JsonIgnore]
        public virtual List<Meal> Meals { get; set; }=[];
    }
}