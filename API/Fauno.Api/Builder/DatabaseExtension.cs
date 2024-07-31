using Fauno.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Fauno.Api.Builder
{
    public static class DatabaseExtension
    {
        public static void AddDatabaseConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<Context>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
        }
    }
}
