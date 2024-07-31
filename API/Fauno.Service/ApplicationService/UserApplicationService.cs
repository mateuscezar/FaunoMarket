using AutoMapper;
using Fauno.CrossCutting.Configuration;
using Fauno.CrossCutting.DTO.User;
using Fauno.Domain.Entities;
using Fauno.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace Fauno.Service.ApplicationService
{
    public class UserApplicationService : GenericApplicationService
    {

        public UserApplicationService(UnitOfWork uow, IMapper mapper) : base(uow, mapper)
        {
        }

        public async Task<ActionResponse> Create(UserDto dto)
        {
            if (!IsValidDto(dto)) return ActionResponse.Fail("Dados inválidos.");

            var user = _mapper.Map<User>(dto);

            user.PasswordHash = GenerateMd5Hash(dto.Password);

            _uow.UserRepository.Add(user);
            await _uow.Commit();

            return ActionResponse.Ok();
        }

        private bool IsValidDto(UserDto dto)
        {
            return dto != null && !string.IsNullOrWhiteSpace(dto.Name) && !string.IsNullOrWhiteSpace(dto.Email) && !string.IsNullOrWhiteSpace(dto.Password);
        }
    }
}
