using System;
using System.Collections.Generic;

namespace RecipeApiNew.Models;

public partial class Continent
{
    public int ContinentId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Country> Countries { get; set; } = new List<Country>();
}
