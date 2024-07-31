using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Fauno.Service;

public class ConfigureServiceApplicationService
{
    public static void Configure(IServiceCollection services)
    {
        var assemblyToScan = Assembly.GetExecutingAssembly();
        foreach (var type in assemblyToScan.ExportedTypes)
        {
            if (type.Name.EndsWith("ApplicationService"))
                services.AddScoped(type);
        }
    }
}
