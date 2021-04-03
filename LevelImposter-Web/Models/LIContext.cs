using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LevelImposter.Models
{
    public class LIContext : DbContext
    {
        public DbSet<MapData> LI_Maps { get; set; }

        public LIContext(DbContextOptions<LIContext> options) :base(options)
        {

        }
    }
}
