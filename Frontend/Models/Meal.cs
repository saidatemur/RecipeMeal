using System;
using System.Collections.Generic;

namespace RecipeApiNew.Models;

public partial class Meal
{
    public int MealId { get; set; }

    public string Name { get; set; } = null!;

    public string? Recipe { get; set; }

    public string? ImageUrl { get; set; }

    public string? VideoUrl { get; set; }

    public int CountryId { get; set; }

    public int MealTypeId { get; set; }

    public virtual Country Country { get; set; } = null!;

    public virtual MealType MealType { get; set; } = null!;
}
