using Fauno.Infrastructure.Contexts;
using Fauno.Infrastructure.Contexts.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace Fauno.Infrastructure;

public class UnitOfWork
{
    private readonly Context _context;

    private readonly IServiceProvider _serviceProvider;

    public UnitOfWork(Context context, IServiceProvider serviceProvider)
    {
        _context = context;
        _serviceProvider = serviceProvider;
    }

    public UserRepository UserRepository => _serviceProvider.GetService<UserRepository>();
    public ProductRepository ProductRepository => _serviceProvider.GetService<ProductRepository>();
    public ProductCategoryRepository ProductCategoryRepository => _serviceProvider.GetService<ProductCategoryRepository>();

    public async Task Commit()
    {
        await Task.WhenAll(_context.SaveChangesAsync());
    }
}
