using Fauno.CrossCutting.Configuration;
using Fauno.CrossCutting.DTO.Product;
using Fauno.Domain.Entities;
using Fauno.Infrastructure;
using AutoMapper;
using Fauno.CrossCutting.DTO.ProductCategory;

namespace Fauno.Service.ApplicationService
{
    public class ProductCategoryApplicationService : GenericApplicationService
    {

        public ProductCategoryApplicationService(UnitOfWork uow, IMapper mapper) : base(uow, mapper)
        {

        }

        public ActionResponse<List<ProductCategoryDto>> Get()
        {
            var productCategories = _uow.ProductCategoryRepository.GetAll().ToList();

            if (!productCategories.Any()) return ActionResponse<List<ProductCategoryDto>>.Fail("Nenhuma categoria cadastrada.");

            var categoriesDto = _mapper.Map<List<ProductCategoryDto>>(productCategories);

            return ActionResponse<List<ProductCategoryDto>>.Ok(categoriesDto);
        }

    }

}
