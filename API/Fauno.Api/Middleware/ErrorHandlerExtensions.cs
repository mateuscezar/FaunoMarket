using Fauno.CrossCutting.Configuration;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using System.Text.Json;

namespace Fauno.Api.Middleware
{
    public static class ErrorHandlerExtensions
    {
        public static IApplicationBuilder UseDomainErrorHandler(
                                          this IApplicationBuilder appBuilder)
        {
            return appBuilder.UseExceptionHandler(builder =>
            {
                builder.Run(async context =>
                {
                    var exceptionHandlerFeature = context
                                                    .Features
                                                    .Get<IExceptionHandlerFeature>();

                    if (exceptionHandlerFeature != null && exceptionHandlerFeature.Error is DomainException)
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.ContentType = "application/json";

                        var json = new
                        {
                            Message = exceptionHandlerFeature.Error.Message,
                        };

                        await context.Response.WriteAsync(JsonSerializer.Serialize(json));
                    }
                });
            });
        }
    }
}
