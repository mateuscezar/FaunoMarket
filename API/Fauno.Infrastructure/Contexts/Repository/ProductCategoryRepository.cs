using Fauno.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Fauno.Infrastructure.Contexts.Repository
{
    public class ProductCategoryRepository : GenericRepository<ProductCategory, Context>
    {
        private readonly Context _context;
        public ProductCategoryRepository(Context context) : base(context)
        {
            _context = context;
        }

        public IQueryable<ProductCategory> GetByIdQueryable(int id) => _context.ProductCategories.Where(c => c.Id == id);

    }
}
