using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RecipeApiNew.Models;

public partial class YemekTarifleriContext : DbContext
{
    public YemekTarifleriContext()
    {
    }

    public YemekTarifleriContext(DbContextOptions<YemekTarifleriContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Continent> Continents { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<Meal> Meals { get; set; }

    public virtual DbSet<MealType> MealTypes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-MHTA938\\SQLEXPRESS;Database=YemekTarifleri;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Continent>(entity =>
        {
            entity.HasKey(e => e.ContinentId).HasName("PK__Continen__7E5220E1982C9401");

            entity.ToTable("Continent");

            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.CountryId).HasName("PK__Countrie__10D1609F31390019");

            entity.ToTable("Country");

            entity.Property(e => e.Name).HasMaxLength(100);

            entity.HasOne(d => d.Continent).WithMany(p => p.Countries)
                .HasForeignKey(d => d.ContinentId)
                .HasConstraintName("FK__Countries__Conti__398D8EEE");
        });

        modelBuilder.Entity<Meal>(entity =>
        {
            entity.HasKey(e => e.MealId).HasName("PK__Meals__ACF6A63D3AAFF763");

            entity.ToTable("Meal");

            entity.Property(e => e.ImageUrl).HasMaxLength(2083);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.VideoUrl).HasMaxLength(2083);

            entity.HasOne(d => d.Country).WithMany(p => p.Meals)
                .HasForeignKey(d => d.CountryId)
                .HasConstraintName("FK__Meals__CountryId__3E52440B");

            entity.HasOne(d => d.MealType).WithMany(p => p.Meals)
                .HasForeignKey(d => d.MealTypeId)
                .HasConstraintName("FK__Meals__MealTypeI__3F466844");
        });

        modelBuilder.Entity<MealType>(entity =>
        {
            entity.HasKey(e => e.MealTypeId).HasName("PK__MealType__702B379E90BC7CB0");

            entity.ToTable("MealType");

            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C461CE334");

            entity.ToTable("User");

            entity.HasIndex(e => e.Email, "UQ__Users__A9D10534376401A9").IsUnique();

            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.UserName).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
