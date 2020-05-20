using back_end.Data;
using back_end.Domain;

using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

public class UserRepository : Repository<User>
{
    public UserRepository(DataBaseContext context) : base(context) { }

    public User Get(string email, string password)
    {
        return _context.User?.FirstOrDefault(u => u.Email == email && u.Password == password);
    }

    public User ResearchToken(string token)
    {
        return _context.User?.FirstOrDefault(u => u.Token == token);
    }

    public User ResearchEmail(string email)
    {
        return _context.User?.FirstOrDefault(u => u.Email == email);
    }
}
