using AutoMapper;
using Fauno.CrossCutting.DTO.Auth;
using Fauno.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Fauno.Service.ApplicationService
{
    public class AuthApplicationService: GenericApplicationService
    {
        public AuthApplicationService(UnitOfWork uow, IMapper mapper) : base(uow, mapper)
        {

        }

        public async Task<AuthDataDto?> Authentication(AuthTokenDto authDto)
        {
            VerifyExists(authDto, "Dados");
            var account = await _uow.UserRepository.GetByLogin(authDto.Email, GenerateMd5Hash(authDto.Password)).FirstOrDefaultAsync();
            VerifyExists(account, "Cadastro");

            var data = _mapper.Map<AuthDataDto>(account);

            return data;
        }
    }
}
