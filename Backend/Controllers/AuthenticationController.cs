using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Azure.Identity;
using RecipeApi.Dtos;
using RecipeApi.Models;
using RecipeApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace RecipeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private static readonly TimeSpan TokenLifeTime = TimeSpan.FromHours(8);

        private readonly IConfiguration configuration;
        private readonly AppDbContext dbContext;

        public AuthenticationController(AppDbContext dbContext, IConfiguration configuration)
        {
            this.configuration = configuration;
            this.dbContext = dbContext;
        }

        [HttpPost("Login")]
        public IActionResult Login(LoginDto dto)
        {
            var userObj = dbContext.Users.FirstOrDefault(u => u.UserName == dto.Username);
            if (userObj is null)
                return NotFound();

            if (PasswordHasher.HashPassword(dto.Password) != userObj.Password)
                return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"]!);

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier,userObj.UserId.ToString())
            };

            if (userObj.IsAdmin)
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.Add(TokenLifeTime),
                Issuer = configuration["JwtSettings:Issuer"],
                Audience = configuration["JwtSettings:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var jwt = tokenHandler.WriteToken(token);

            HttpContext.Response.Cookies.Append("token", jwt, new CookieOptions
            {
                Expires = DateTime.Now.AddDays(7),
                HttpOnly = true
            });

            return Ok(new
            {
                UserId = userObj.UserId,
                Username = userObj.UserName,
                ExpireDate = DateTime.UtcNow.Add(TokenLifeTime),
                Role = userObj.IsAdmin ? "Admin" : "User"
            });

            // return Ok(jwt);
        }

        [HttpPost("Register")]
        public IActionResult Register(UserDto dto)
        {
            string hashedPassword = PasswordHasher.HashPassword(dto.Password);

            var userObj = new User
            {
                UserName = dto.Username,
                Password = hashedPassword,
                IsAdmin = false
            };

            dbContext.Users.Add(userObj);
            dbContext.SaveChanges();

            return Ok(userObj);
        }

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            HttpContext.Response.Cookies.Append("token", "", new CookieOptions
            {
                Expires = DateTime.Now.AddDays(-1),
                HttpOnly = true
            });
            return Ok();
        }
    }
}