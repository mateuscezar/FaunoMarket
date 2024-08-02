using Microsoft.EntityFrameworkCore;

namespace Fauno.Infrastructure
{
    public abstract class GenericRepository<TEntity, TDbContext> where TEntity : class where TDbContext : DbContext
    {
        protected readonly TDbContext _entities;
        protected readonly DbSet<TEntity> _dbSet;

        public GenericRepository(TDbContext context)
        {
            _entities = context;
            _dbSet = context.Set<TEntity>();
        }

        public int Count()
        {
            return _dbSet.Count();
        }

        public int Count(Func<TEntity, bool> predicate)
        {
            return _dbSet.Count(predicate);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbSet;
        }

        public IQueryable<TEntity> GetAllReadOnly()
        {
            return _dbSet.AsNoTracking();
        }

        public virtual async Task<TEntity?> GetByIdAsync(params object?[]? id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual async Task<TEntity?> GetByIdAsync(long id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual async Task<TEntity?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual void MassDelete(List<TEntity> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public virtual void MassDelete(IEnumerable<TEntity> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public virtual void MassDelete(IQueryable<TEntity> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public TEntity Add(TEntity entity)
        {
            return _dbSet.Add(entity).Entity;
        }

        public void Update(TEntity entity)
        {
            _dbSet.Update(entity);
        }

        public void Delete(TEntity entity)
        {
            _dbSet.Remove(entity);
        }

        public void MassAdd(IEnumerable<TEntity> entities)
        {
            _dbSet.AddRange(entities);
        }
    }
}
