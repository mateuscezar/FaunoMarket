using AutoMapper;
using Fauno.CrossCutting.Configuration;
using Fauno.Infrastructure;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Fauno.Service
{
    public class GenericApplicationService
    {
        protected readonly UnitOfWork _uow;
        protected readonly IMapper _mapper;
        public GenericApplicationService(UnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public void VerifyExists<T>(T obj, string name = "Objeto")
        {
            if (obj == null || (obj is string str && string.IsNullOrEmpty(str)) || (obj is ICollection collection && collection.Count == 0))
            {
                throw new DomainException($"{name} não encontrado(a).");
            }
        }

        public string GenerateMd5Hash(string input)
        {
            using (var md5 = MD5.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);
                var sb = new StringBuilder();
                foreach (var b in hashBytes)
                {
                    sb.Append(b.ToString("x2"));
                }
                return sb.ToString();
            }
        }
    }
}
