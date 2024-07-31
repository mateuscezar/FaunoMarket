using Fauno.CrossCutting.Configuration;
using Fauno.CrossCutting.DTO.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Fauno.Api.Helper
{
    public static class TokenHelper
    {
        private static byte[] _secret;

        public static void Initialize(IConfiguration configuration)
        {
            var jwtConfig = configuration.GetSection("JwtConfig").Get<JwtConfig>();
            _secret = Encoding.ASCII.GetBytes(jwtConfig.Secret);
        }

        public static string GenerateToken(AuthDataDto userData, string[]? roles = null, int hours = 24)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, userData.Name),
                new(ClaimTypes.Email, userData.Email)
            };

            if (roles != null) claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims.ToArray()),
                Expires = DateTime.UtcNow.AddHours(hours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_secret), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static ClaimsPrincipal ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(_secret),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };
            return tokenHandler.ValidateToken(token, validationParameters, out _);
        }
    }
}
