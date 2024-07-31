using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Fauno.Domain.Entities;

namespace Fauno.Infrastructure.Contexts.Map
{
    public class ProductMap : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Name).IsRequired().HasMaxLength(255);
            builder.Property(e => e.Description).HasMaxLength(255);
            builder.Property(e => e.Price).IsRequired();
            builder.Property(e => e.StockQuantity).IsRequired();
            builder.Property(e => e.CategoryId).IsRequired();

            builder.HasOne(e => e.Category)
                  .WithMany(c => c.Products)
                  .HasForeignKey(e => e.CategoryId);
        }
    }
}
