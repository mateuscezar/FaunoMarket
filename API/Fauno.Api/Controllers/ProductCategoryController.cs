using Fauno.Api.Helper;
using Fauno.CrossCutting.Configuration;
using Fauno.CrossCutting.DTO.Auth;
using Fauno.CrossCutting.DTO.Product;
using Fauno.CrossCutting.DTO.ProductCategory;
using Fauno.CrossCutting.DTO.User;
using Fauno.Service.ApplicationService;
using Microsoft.AspNetCore.Mvc;

namespace Fauno.Api.Controllers
{
    [ApiController]
    [Route("productcategory")]
    public class ProductCategoryController
    {
        private readonly ProductCategoryApplicationService _appService;
        public ProductCategoryController(ProductCategoryApplicationService appService)
        {
            _appService = appService;
        }

        [HttpGet]
        public ActionResponse<List<ProductCategoryDto>> GetAll()
        {
            return _appService.Get();
        }
    }
}
