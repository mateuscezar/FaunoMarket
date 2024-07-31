using Fauno.Service.ApplicationService;

namespace Services;

public class ProductApplicationServiceTest
{
    private readonly ProductApplicationService _service;

    public ProductApplicationServiceTest()
    {
        _service = new ProductApplicationService(null, null);
    }


    [Fact]
    public void ValidateProduct_NameIsNull_ReturnsFailure()
    {
        string name = null;
        decimal price = 10.0m;
        int stock = 5;

        var result = _service.ValidateProduct(name, price, stock);

        Assert.False(result.Success);
        Assert.Equal("O nome do produto é obrigatório.", result.Message);
    }
}