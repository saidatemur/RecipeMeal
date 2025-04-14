using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeApi.Models;
using RecipeApi.Dtos;
using RecipeApi.Services;
using RecipeApiNew.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace RecipeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MealsController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public MealsController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // Get all meals
        [HttpGet]
        public IActionResult GetAllMeals()
        {
            var meals = dbContext.Meals
                .Include(m => m.MealType)
                .Select(m => new 
                {
                    m.MealId,
                    m.Name,
                    m.MealType.MealTypeId,
                })
                .ToList();

            return Ok(meals);
        }

        // Get meal details by ID
        [HttpGet("{mealId:int}")]
        public IActionResult GetMealDetails(int mealId)
        {
            var mealObj = dbContext.Meals.
            Where(m => m.MealId == mealId)
            .Select(m => new 
                {
                    m.Name,
                    m.Recipe,
                    m.ImageUrl,
                    m.VideoUrl
                })
            .FirstOrDefault();

            if (mealObj == null)
                return NotFound();

            return Ok(mealObj);
        }

        // Get meal name by countryId
        [HttpGet("{countryId:int}/Country")]
        public IActionResult GetMealsByCountryId(int countryId)
        {
            var mealObj = dbContext.Meals
                .Where(m => m.CountryId == countryId)
                .Select(m => new 
                {
                    m.Name,
                    m.MealId,
                })
                .FirstOrDefault();

            if (mealObj == null)
                return NotFound();

            return Ok(mealObj);
        }

        // Get meal name by mealTypeId
        [HttpGet("{mealTypeId:int}/MealType")]
        public IActionResult GetMealsByMealTypeId(int mealTypeId)
        {
            var mealObj = dbContext.Meals
                .Where(m => m.MealTypeId == mealTypeId)
                .Select(m => new 
                {
                    m.Name,
                    m.MealId,
                })
                .ToList();

            if (mealObj == null)
                return NotFound();

            return Ok(mealObj);
        }

        [Authorize]
        // Add a new meal
        [HttpPost]
        public IActionResult AddMeal(MealDto dto)
        {   var mealTypeObje=dbContext.MealTypes.FirstOrDefault(mt => mt.MealTypeId == dto.MealTypeId);
            var countryObj=dbContext.Countries.FirstOrDefault(c => c.CountryId == dto.CountryId);
            
            if ( countryObj == null || mealTypeObje ==null)
            {
                return BadRequest();
            }
            
            var mealObj = new Meal
            {
                Name = dto.Name,
                Recipe = dto.Recipe,
                ImageUrl = dto.ImageUrl ,
                VideoUrl = dto.VideoUrl,
                MealType = mealTypeObje,
                Country = countryObj
            };
                
            dbContext.Meals.Add(mealObj);
            dbContext.SaveChanges();

            return Ok(mealObj);
        }

        [HttpDelete]
        [Route("{mealId:int}")]
        public IActionResult deleteMeal(int mealId)
        {
            var mealObj = dbContext.Meals.Find(mealId);
            if (mealObj is null)
                return NotFound();

            dbContext.Meals.Remove(mealObj);

            dbContext.SaveChanges();

            return Ok(mealObj);
        }

        // PUT: api/meals/{mealId}
        [HttpPut("{mealId}")]
        public IActionResult UpdateMeal(int mealId, [FromBody] MealDto mealDto)
        {   if (!ModelState.IsValid)
            {
                return BadRequest(); 
            }

            var meal = dbContext.Meals.Find(mealId);

            if (meal is null)
            {
                return NotFound($"Meal with ID {mealId} not found.");
            }

            meal.Name = mealDto.Name;
            meal.Recipe = mealDto.Recipe;
            meal.MealTypeId = mealDto.MealTypeId;
            meal.CountryId = mealDto.CountryId;
            meal.ImageUrl = mealDto.ImageUrl;
            meal.VideoUrl = mealDto.VideoUrl;

            dbContext.SaveChanges();

            return Ok(meal);
        }


    }
}

