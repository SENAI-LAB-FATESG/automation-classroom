using back_end.Data;
using back_end.Domain;

using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

public class AmbienteRepository : Repository<Ambiente>
{
    public AmbienteRepository(DataBaseContext context) : base(context) { }
    
}
