using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fauno.CrossCutting.DTO.Auth
{
    public class AuthTokenDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
