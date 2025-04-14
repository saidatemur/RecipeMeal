using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using RecipeApi.Services;
namespace RecipeApi.Models{
    public class Country
    {
        public int CountryId { get; set; }
        public required string Name { get; set; }
        public int ContinentId { get; set; }
        public virtual required Continent Continent { get; set; }
        [JsonIgnore]
        public virtual List<MealType> MealTypes { get; set; }=[];
    }
}