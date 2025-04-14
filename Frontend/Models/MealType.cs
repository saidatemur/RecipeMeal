using System;
using System.Collections.Generic;

namespace RecipeApiNew.Models;

public partial class MealType
{
    public int MealTypeId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Meal> Meals { get; set; } = new List<Meal>();
}
