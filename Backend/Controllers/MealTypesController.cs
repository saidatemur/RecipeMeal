using Microsoft.AspNetCore.Mvc;
using RecipeApi.Models;
using RecipeApi.Services;
using Microsoft.EntityFrameworkCore;
using RecipeApiNew.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace RecipeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MealTypesController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public MealTypesController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{countryId:int}")]
        public IActionResult GetMealTypesByCountry(int countryId)
        {
            var mealTypes = dbContext.Countries.
                Where(c => c.CountryId == countryId).
                Include(c=>c.MealTypes)
                .SelectMany(c=>c.MealTypes)
                .Select(mt => new 
                {
                    mt.MealTypeId,
                    mt.Name
                })
                .ToList();
            return Ok(mealTypes);
        }

        [HttpGet("byId/{id:int}")]
        public IActionResult GetMealTypeById(int id)
        {
            var mealType = dbContext.MealTypes.
            Include(mt=>mt.Countries)
            .FirstOrDefault(mt => mt.MealTypeId == id);

            if (mealType == null)
                return NotFound($"MealType with ID {id} not found.");

            return Ok(mealType);
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddMealType(MealTypeDto mealTypeDto)
        {
            if (string.IsNullOrEmpty(mealTypeDto.Name))
                return BadRequest("Meal type name is required.");

            var mealTypeObj = new MealType
            {
                Name = mealTypeDto.Name
            };

            dbContext.MealTypes.Add(mealTypeObj);
            dbContext.SaveChanges();

            return  Ok(mealTypeObj);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateMealType(int id, MealTypeDto dto)
        {
            var mealType = dbContext.MealTypes.Find(id);
            if (mealType == null)
            {
                return NotFound();
            }

            mealType.Name = dto.Name;

            dbContext.MealTypes.Update(mealType);
            dbContext.SaveChanges();

            return NoContent();
        }

        // DELETE: api/mealtypes/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteMealType(int id)
        {
            var mealType = dbContext.MealTypes.Find(id);
            if (mealType == null)
            {
                return NotFound();
            }

            dbContext.MealTypes.Remove(mealType);
            dbContext.SaveChanges();

            return NoContent();
        }
    }
}
