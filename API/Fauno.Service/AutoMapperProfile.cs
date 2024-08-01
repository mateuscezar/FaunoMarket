using Fauno.CrossCutting.DTO.Product;
using Fauno.Domain.Entities;
using AutoMapper;
using System;
using Fauno.CrossCutting.DTO.User;
using Fauno.CrossCutting.DTO.Auth;
using Fauno.CrossCutting.DTO.ProductCategory;

namespace Fauno.Service
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, AuthDataDto>();
            CreateMap<UserDto, User>().ForMember(dest => dest.PasswordHash, opt => opt.Ignore());
            CreateMap<ProductDto, Product>().ReverseMap();
            CreateMap<ProductPutDto, Product>().ReverseMap();
            CreateMap<ProductCategoryDto, ProductCategory>().ReverseMap();
        }
    }
}
