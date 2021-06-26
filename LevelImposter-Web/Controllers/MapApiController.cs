using LevelImposter.Models;
using LevelImposter.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace LevelImposter.Controllers
{
    public class MapApiController : ApiController
    {
        private LIService service;

        public MapApiController(LIContext context)
        {
            service = new LIService(context);
            this.Configuration = new HttpConfiguration();
            this.Request = new System.Net.Http.HttpRequestMessage();
        }

        public MapDataViewModel[] GetAllMaps()
        {
            MapData[] maps = service.GetAllMaps();
            MapDataViewModel[] viewModels = new MapDataViewModel[maps.Length];
            for (int i = 0; i < viewModels.Length; i++)
            {
                viewModels[i] = new MapDataViewModel(maps[i]);
            }

            return viewModels;
        }

        public MapDataViewModel GetMap(string id)
        {
            int realId = MapDataViewModel.StringToId(id);

            MapData map = service.GetMapById(realId);
            if (map == null)
                return null;
            return new MapDataViewModel(map);
        }

        public string Download(string id)
        {
            int realId = MapDataViewModel.StringToId(id);

            MapData map = service.GetMapById(realId);
            if (map == null)
                return null;
            return map.Json;
        }
    }
}
