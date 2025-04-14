using System;
using System.Collections.Generic;

namespace RecipeApiNew.Models;

public partial class Country
{
    public int CountryId { get; set; }

    public string Name { get; set; } = null!;

    public int ContinentId { get; set; }

    public virtual Continent Continent { get; set; } = null!;

    public virtual ICollection<Meal> Meals { get; set; } = new List<Meal>();
}
