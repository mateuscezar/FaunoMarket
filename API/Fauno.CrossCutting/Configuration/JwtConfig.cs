using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fauno.CrossCutting.Configuration
{
    public class JwtConfig
    {
        public string Secret { get; set; }
        public int ExpiryMinutes { get; set; }
    }
}
