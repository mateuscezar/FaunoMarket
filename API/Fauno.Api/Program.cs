using Fauno.Api.Builder;
using Fauno.Api.Helper;
using Fauno.Api.Middleware;
using Fauno.Infrastructure;
using Fauno.Service;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
{

    builder.WebHost.ConfigureKestrel(serverOptions =>
    {
        serverOptions.ListenAnyIP(5000);
    });

    var services = builder.Services;
    services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
    services.AddAutoMapper(typeof(AutoMapperProfile));
    services.AddDatabaseConfiguration(builder.Configuration);
    services.AddScoped<UnitOfWork>();
    ConfigureServiceApplicationService.Configure(services);
    ConfigureServiceRepository.Configure(services);
    TokenHelper.Initialize(builder.Configuration);
    services.AddDatabaseConfiguration(builder.Configuration);
    services.AddJwtSecurity(builder.Configuration);

    if (builder.Environment.IsDevelopment())
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Fauno API", Version = "v1" });
        });
    }
}

var app = builder.Build();
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Fauno API v1"));
        app.UseDeveloperExceptionPage();
    }

    app.UseDomainErrorHandler();
    app.UseRouting();
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    app.UseAuthorization();
    app.UseAuthentication();
    app.MapControllers().RequireAuthorization();
}

app.Run();