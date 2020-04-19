using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using back_end.Domain;
using Microsoft.EntityFrameworkCore;

namespace back_end.Data {
    public class Repository<T> : IRepository<T> where T : BaseEntity {

        private readonly DataBaseContext _context;
        private DbSet<T> _database;

        public Repository(DataBaseContext context)
        {
            _context = context;
            _database = _context.Set<T>();
        }

        public async Task<T> Create(T entity)
        {
            try
            {
                if(Guid.Empty == entity.Id)
                    entity.Id = Guid.NewGuid();
                entity.CreateAt = DateTime.Now;
                entity.UpdateAt = entity.CreateAt;
                await _database.AddAsync(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                
                throw e;
            }

            return entity;
        }

        public async Task<T> ResearchID(Guid id)
        {
            try
            {
                var result = await _database.SingleOrDefaultAsync(e => e.Id.Equals(id));
                if (result == null)
                    return null;
                return result;
            }
            catch (Exception e)
            {
                
                throw e;
            }
        }

        public async Task<IEnumerable<T>> ResearchAll()
        {
            try
            {
                return await _database.ToListAsync();
            }
            catch (Exception e)
            {
                
                throw e;
            }
        }

        public async Task<T> Update(T entity)
        {
            try
            {
                var result = await _database.SingleOrDefaultAsync(e => e.Id.Equals(entity.Id));
                if (result == null)
                    return null;
                entity.CreateAt = result.CreateAt;
                entity.UpdateAt = DateTime.Now;
                _context.Entry(result).CurrentValues.SetValues(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                
                throw e;
            }

            return entity;
        }

        public async Task<bool> Delete(Guid id)
        {
            try
            {
                var result = await _database.SingleOrDefaultAsync(e => e.Id.Equals(id));
                if (result == null)
                    return false;
                _context.Remove(result);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                
                throw e;
            }

            return true;
        }

        public async Task<bool> Exists(Guid id)
        {
            try
            {
                return await _database.AnyAsync(e => e.Id == id);
            }
            catch (Exception e)
            {
                
                throw e;
            }
        }
    }
}