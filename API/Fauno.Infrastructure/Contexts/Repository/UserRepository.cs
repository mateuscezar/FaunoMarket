using Fauno.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Fauno.Infrastructure.Contexts.Repository
{
    public class UserRepository : GenericRepository<User, Context>
    {
        private readonly Context _context;
        public UserRepository(Context context) : base(context)
        {
            _context = context;
        }

        public IQueryable<User> GetByLogin(string email, string password) => _context.User.Where(u => u.Email == email && u.PasswordHash == password);

        public IQueryable<User> GetByEmail(string email) => _context.User.Where(u => u.Email == email);
    }
}
