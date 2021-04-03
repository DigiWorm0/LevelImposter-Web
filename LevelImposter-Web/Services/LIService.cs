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

        public void DeleteMap(int id)
        {
            repo.DeleteMap(repo.GetMapById(id));
        }

        public MapData GetMap(int id)
        {
            return repo.GetMapById(id);
        }

        public MapData[] GetRecent(int amt)
        {
            return repo.GetRecent(amt);
        }

        public MapData[] GetMostLikes(int amt)
        {
            return repo.GetMostLikes(amt);
        }

        public void AddMap(MapData map)
        {
            repo.AddMap(map);
        }
    }
}
