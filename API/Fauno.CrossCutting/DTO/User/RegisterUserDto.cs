﻿
namespace Fauno.CrossCutting.DTO.User
{
    public class RegisterUserDto
    {
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
