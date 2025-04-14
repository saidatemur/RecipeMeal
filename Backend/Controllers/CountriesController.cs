using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecipeApi.Services;
using RecipeApi.Models;
using Microsoft.EntityFrameworkCore;
using RecipeApiNew.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace RecipeApi.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class CountriesController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public CountriesController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        
        [HttpGet("{continentId:int}")]
        public IActionResult GetCountriesByContinent(int continentId)
        {
            var countries = dbContext.Countries.Include(c=>c.Continent)
                .Where(c => c.ContinentId == continentId)
                .ToList();

            if (countries == null)
            {
                return NotFound();
            }    
            return Ok(countries);
        }
        [Authorize]
        [HttpPost]
        public IActionResult CreateCountry(CountryDto dto)
        {
            var continentObj = dbContext.Continents.Find(dto.ContinentId);
            if (continentObj is null)
                return NotFound();

            var countryObj = new Country()
            {
                Name = dto.Name,
                Continent = continentObj,
            };

            dbContext.Countries.Add(countryObj);
            dbContext.SaveChanges();

            return Ok(countryObj);
        }

        [HttpPost]
        [Route("{countryId:int}/MealTypes")]
        public IActionResult AddTag(int countryId, CountryMealTypeDto dto)
        {
            var countryObj = dbContext.Countries.Include(c => c.MealTypes).FirstOrDefault(c => c.CountryId ==countryId);
            var mealTypeObj = dbContext.MealTypes.Find(dto.MealTypeId);
            if (countryObj is null || mealTypeObj is null)
                return NotFound();

            countryObj.MealTypes.Add(mealTypeObj);

            dbContext.SaveChanges();
            return Ok(countryObj);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCountry(int id, CountryDto dto)
        {
            var countryObj = dbContext.Countries.Find(id);

            if (countryObj == null)
            {
                return NotFound();
            }

            var continentObj = dbContext.Continents.Find(dto.ContinentId);
            if (continentObj == null)
            {
                return BadRequest("Continent not found");
            }

            countryObj.Name = dto.Name;
            countryObj.Continent = continentObj;

            dbContext.Countries.Update(countryObj);
            dbContext.SaveChanges();

            return NoContent();
        }

        // DELETE: api/countries/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCountry(int id)
        {
            var countryObj = dbContext.Countries.Find(id);

            if (countryObj == null)
            {
                return NotFound();
            }

            dbContext.Countries.Remove(countryObj);
            dbContext.SaveChanges();

            return NoContent();
        }

    }
}