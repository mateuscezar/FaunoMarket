using Fauno.Api.Helper;
using Fauno.CrossCutting.DTO.Auth;
using Fauno.Service.ApplicationService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Fauno.Api.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController
    {
        private readonly AuthApplicationService _appService;
        public AuthController(AuthApplicationService appService)
        {
            _appService = appService;
        }

        [HttpPost("token")]
        [AllowAnonymous]
        public async Task<IResult> Token([FromBody] AuthTokenDto authDto)
        {
            var authInfo = await _appService.Authentication(authDto);
            if (authInfo == null) return Results.BadRequest();
            authInfo.Token = TokenHelper.GenerateToken(authInfo);
            return Results.Ok(authInfo);
        }

    }
}
