using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeApi.Models;
using RecipeApi.Services;
using RecipeApiNew.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace RecipeApi.Controllers{

    [ApiController]
    [Route("api/[controller]")]
    public class ContinentsController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public ContinentsController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public Task<IActionResult> getAllContinents()
        {
            var continents = dbContext.Continents.Include(c=> c.Countries).ToList();
            return Task.FromResult<IActionResult>(Ok(continents));
        }

        [Authorize]
        [HttpPost]
        public IActionResult createContinent(ContinentDto dto)
        {
           
            var continentObj = new Continent()
            {
                Name = dto.Name,
               
            };

            dbContext.Continents.Add(continentObj);

            dbContext.SaveChanges();

            return Ok(continentObj);
        }

        
        [HttpPut("{id}")]
        public IActionResult UpdateContinent(int id, ContinentDto dto)
        {
            var continent = dbContext.Continents.Find(id);

            if (continent == null)
            {
                return NotFound();
            }

            continent.Name = dto.Name;

            dbContext.Continents.Update(continent);
            dbContext.SaveChanges();

            return NoContent();
        }

        [Authorize]
        // DELETE: api/continents/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteContinent(int id)
        {
            var continent = dbContext.Continents.Find(id);

            if (continent == null)
            {
                return NotFound();
            }

            dbContext.Continents.Remove(continent);
            dbContext.SaveChanges();

            return NoContent();
        }
    }
}