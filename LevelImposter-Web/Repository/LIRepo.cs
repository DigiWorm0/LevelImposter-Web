using LevelImposter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LevelImposter.Repository
{
    public class LIRepo
    {
        private readonly LIContext db;

        public LIRepo(LIContext context)
        {
            db = context;
        }

        public MapData GetMapById(int id)
        {
            return db.LI_Maps.FirstOrDefault(map => map.Id == id);
        }

        public MapData[] GetAllMaps()
        {
            return db.LI_Maps.ToArray();
        }

        public void DeleteMap(MapData map)
        {
            db.Remove(map);
            Save();
        }

        public void AddMap(MapData map)
        {
            db.LI_Maps.Add(map);
            Save();
        }

        public void Save()
        {
            db.SaveChanges();
        }
    }
}
