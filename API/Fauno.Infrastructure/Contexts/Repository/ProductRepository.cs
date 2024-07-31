using Fauno.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Fauno.Infrastructure.Contexts.Repository
{
    public class ProductRepository : GenericRepository<Product, Context>
    {
        private readonly Context _context;
        public ProductRepository(Context context) : base(context)
        {
            _context = context;
        }

        public IQueryable<Product> GetByIdQueryable(int id) => _context.Products.Where(p => p.Id == id);

    }
}
