using Microsoft.EntityFrameworkCore;
using RecipeApi.Services;
using RecipeApi.Models;

namespace RecipeApi.Services{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Continent> Continents { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<MealType> MealTypes { get; set; }
        public DbSet<Meal> Meals { get; set; }
        

    }
}