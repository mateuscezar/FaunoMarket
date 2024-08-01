using Fauno.Api.Helper;
using Fauno.CrossCutting.Configuration;
using Fauno.CrossCutting.DTO.Auth;
using Fauno.CrossCutting.DTO.Product;
using Fauno.CrossCutting.DTO.User;
using Fauno.Service.ApplicationService;
using Microsoft.AspNetCore.Mvc;

namespace Fauno.Api.Controllers
{
    [ApiController]
    [Route("product")]
    public class ProductController
    {
        private readonly ProductApplicationService _appService;
        public ProductController(ProductApplicationService appService)
        {
            _appService = appService;
        }

        [HttpPost]
        public async Task<ActionResponse> Create([FromBody] ProductDto dto)
        {
            return await _appService.Create(dto);
        }

        [HttpGet]
        public ActionResponse<List<ProductDto>> GetAll()
        {
            return _appService.GetAll();
        }

        [HttpGet("{productId}")]
        public ActionResponse<ProductDto> GetById([FromRoute] int productId)
        {
            return _appService.Get(productId);
        }

        [HttpPut]
        public async Task<ActionResponse> Put([FromBody] ProductPutDto dto)
        {
            return await _appService.Update(dto);
        }

        [HttpDelete("{productId}")]
        public async Task<ActionResponse> Delete([FromRoute] int productId)
        {
            return await _appService.Delete(productId);
        }

    }
}
