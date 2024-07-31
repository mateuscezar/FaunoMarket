using Fauno.Api.Helper;
using Fauno.CrossCutting.Configuration;
using Fauno.CrossCutting.DTO.Auth;
using Fauno.CrossCutting.DTO.User;
using Fauno.Service.ApplicationService;
using Microsoft.AspNetCore.Mvc;

namespace Fauno.Api.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController
    {
        private readonly UserApplicationService _appService;
        public UserController(UserApplicationService appService)
        {
            _appService = appService;
        }

        [HttpPost]
        public async Task<ActionResponse> Create(UserDto dto)
        {
            return await _appService.Create(dto);
        }

    }
}
