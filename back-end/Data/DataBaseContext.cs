using back_end.Domain;
using Microsoft.EntityFrameworkCore;

namespace back_end.Data
{
    public class DataBaseContext : DbContext
    {
        public DbSet<User> User { get; set; }

        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
            
        }
    }
}