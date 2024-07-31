using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Fauno.Infrastructure
{
    public class ConfigureServiceRepository
    {
        public static void Configure(IServiceCollection services)
        {
            var assemblyToScan = Assembly.GetExecutingAssembly();
            foreach (var type in assemblyToScan.ExportedTypes)
            {
                if (!type.IsAbstract && !type.IsGenericType && type.Name.EndsWith("Repository"))
                    services.AddScoped(type);
            }
        }
    }
}
