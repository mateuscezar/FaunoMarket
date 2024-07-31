using Fauno.CrossCutting.DTO.User;
using Fauno.Service.ApplicationService;

namespace Services;

public class UserApplicationServiceTest
{
    private readonly UserApplicationService _service;

    public UserApplicationServiceTest()
    {
        _service = new UserApplicationService(null, null);
    }


    [Fact]
    public void IsValidDto_ValidDto_ReturnsTrue()
    {
        var dto = new UserDto
        {
            Name = "John Doe",
            Email = "john.doe@example.com",
            Password = "password123",
        };

        var result = _service.IsValidDto(dto);

        Assert.True(result);
    }

    [Fact]
    public void IsValidDto_NullDto_ReturnsFalse()
    {
        var result = _service.IsValidDto(null);

        Assert.False(result);
    }

    [Fact]
    public void IsValidDto_EmptyName_ReturnsFalse()
    {
        var dto = new UserDto
        {
            Name = "",
            Email = "john.doe@example.com",
            Password = "password123",
        };

        var result = _service.IsValidDto(dto);

        Assert.False(result);
    }

    [Fact]
    public void IsValidDto_EmptyEmail_ReturnsFalse()
    {
        var dto = new UserDto
        {
            Name = "John Doe",
            Email = "",
            Password = "password123",
        };

        var result = _service.IsValidDto(dto);

        Assert.False(result);
    }

    [Fact]
    public void IsValidDto_EmptyPassword_ReturnsFalse()
    {
        var dto = new UserDto
        {
            Name = "John Doe",
            Email = "john.doe@example.com",
            Password = "",
        };

        var result = _service.IsValidDto(dto);

        Assert.False(result);
    }
}