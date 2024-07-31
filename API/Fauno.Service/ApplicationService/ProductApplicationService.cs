using Fauno.CrossCutting.Configuration;
using Fauno.CrossCutting.DTO.Product;
using Fauno.Domain.Entities;
using Fauno.Infrastructure;
using AutoMapper;

namespace Fauno.Service.ApplicationService
{
    public class ProductApplicationService : GenericApplicationService
    {

        public ProductApplicationService(UnitOfWork uow, IMapper mapper) : base(uow, mapper)
        {

        }

        public async Task<ActionResponse> Create(ProductDto dto)
        {
            VerifyExists(dto, "Dados");

            var validationResult = ValidateProduct(dto.Name, dto.Price, dto.StockQuantity);
            if (!validationResult.Success) return validationResult;

            if (!IsValidCategory(dto.CategoryId)) return ActionResponse.Fail("Categoria inválida.");

            var product = _mapper.Map<Product>(dto);

            _uow.ProductRepository.Add(product);
            await _uow.Commit();

            return ActionResponse.Ok();
        }

        public ActionResponse<ProductDto> Get(int productId)
        {
            var product = _uow.ProductRepository.GetByIdQueryable(productId)
                .FirstOrDefault();

            if (product == null) return ActionResponse<ProductDto>.Fail("Produto não encontrado.");

            var productDto = _mapper.Map<ProductDto>(product);

            return ActionResponse<ProductDto>.Ok(productDto);
        }

        public async Task<ActionResponse> Update(ProductPutDto dto)
        {
            VerifyExists(dto, "Dados");

            var validationResult = ValidateProduct(dto.Name, dto.Price, dto.StockQuantity);
            if (!validationResult.Success) return validationResult;

            var product = await _uow.ProductRepository.GetByIdAsync(dto.Id);
            if (product == null) return ActionResponse.Fail("Produto não encontrado.");

            if (!IsValidCategory(dto.CategoryId)) return ActionResponse.Fail("Categoria inválida.");

            _mapper.Map(dto, product);

            _uow.ProductRepository.Update(product);
            await _uow.Commit();

            return ActionResponse.Ok();
        }

        public async Task<ActionResponse> Delete(int productId)
        {
            var product = await _uow.ProductRepository.GetByIdAsync(productId);
            if (product == null) return ActionResponse.Fail("Produto não encontrado.");

            _uow.ProductRepository.Delete(product);
            await _uow.Commit();

            return ActionResponse.Ok();
        }

        private bool IsValidCategory(int categoryId)
        {
            return _uow.ProductCategoryRepository.GetByIdQueryable(categoryId).Any();
        }

        public ActionResponse ValidateProduct(string name, decimal price, int stock)
        {
            if (string.IsNullOrWhiteSpace(name))
                return ActionResponse.Fail("O nome do produto é obrigatório.");
            if (price <= 0)
                return ActionResponse.Fail("O preço deve ser maior que zero.");
            if (stock < 0)
                return ActionResponse.Fail("A quantidade em estoque não pode ser negativa.");

            return ActionResponse.Ok();
        }
    }

}
