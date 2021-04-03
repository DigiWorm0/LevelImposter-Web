using LevelImposter.Models;
using LevelImposter.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LevelImposter.Controllers
{
    public class MapController : Controller
    {
        private LIService service;

        public MapController(LIContext context)
        {
            service = new LIService(context);
        }

        public IActionResult Index()
        {
            MapData[] recent = service.GetRecent(100);
            return View(recent);
        }

        public async void Download(int? id)
        {
            if (id == null)
                return;

            MapData map = service.GetMap((int)id);
            byte[] data = Encoding.ASCII.GetBytes(map.mapJson);

            Response.Headers.Add("content-disposition", "attachment; filename=map.json");
            await Response.Body.WriteAsync(data, 0, data.Length);
        }

        public IActionResult Details(int? id)
        {
            if (id == null)
                return RedirectToAction("Index");

            MapData map = service.GetMap((int)id);

            if (map == null)
                return RedirectToAction("Index");

            return View(map);
        }

        public IActionResult Upload()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Upload(MapData map)
        {
            service.AddMap(map);
            return RedirectToAction("Index");
        }
    }
}
