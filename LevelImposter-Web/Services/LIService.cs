using LevelImposter.Models;
using LevelImposter.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LevelImposter.Services
{
    public class LIService
    {
        private readonly LIRepo repo;

        public LIService(LIContext context)
        {
            repo = new LIRepo(context);
        }

        public void DeleteMapById(int id)
        {
            repo.DeleteMap(repo.GetMapById(id));
        }

        public MapData GetMapById(int id)
        {
            return repo.GetMapById(id);
        }

        public MapData[] GetAllMaps()
        {
            return repo.GetAllMaps();
        }

        public void AddMap(MapData map)
        {
            repo.AddMap(map);
        }
    }
}
