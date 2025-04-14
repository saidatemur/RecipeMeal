using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using RecipeApi.Services;
namespace RecipeApi.Models{
    public class Continent
    {
        public int ContinentId { get; set; }
        public required string Name { get; set; }
        [JsonIgnore]
        public virtual List<Country> Countries { get; set; }=[];

    
    }
}