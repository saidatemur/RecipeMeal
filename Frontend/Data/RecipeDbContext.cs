using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RecipeApiNew.Models;

    public class RecipeDbContext : DbContext
    {
        public RecipeDbContext (DbContextOptions<RecipeDbContext> options)
            : base(options)
        {
        }

        public DbSet<RecipeApiNew.Models.Meal> Meal { get; set; } = default!;
    }
