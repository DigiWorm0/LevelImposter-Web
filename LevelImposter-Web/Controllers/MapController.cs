using LevelImposter.Models;
using LevelImposter.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
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
            MapData[] maps = service.GetAllMaps();
            MapDataViewModel[] viewModels = new MapDataViewModel[maps.Length];
            for (int i = 0; i < viewModels.Length; i++)
            {
                viewModels[i] = new MapDataViewModel(maps[i]);
            }

            return View(viewModels);
        }

        public async void Download(string? id)
        {
            if (id == null)
                return;

            int realId = MapDataViewModel.StringToId(id);
            MapData map = service.GetMapById((int)realId);

            if (map == null)
            {
                RedirectToAction("Index");
                return;
            }


            byte[] data = Encoding.ASCII.GetBytes(map.Json);
            Response.Headers.Add("content-disposition", "attachment; filename=" + id + ".json");
            await Response.Body.WriteAsync(data, 0, data.Length);
        }

        public IActionResult Details(string? id)
        {
            if (id == null)
                return RedirectToAction("Index");

            int realId = MapDataViewModel.StringToId(id);
            MapData map = service.GetMapById((int)realId);

            if (map == null)
                return RedirectToAction("Index");

            return View(new MapDataViewModel(map));
        }

        public IActionResult Upload()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Upload(MapData Map, IFormFile JsonFile)
        {
            // File Existance
            if (JsonFile == null)
            {
                ViewBag.Message = "File provided does not exist";
                return View();
            }

            // File Size
            if (JsonFile.Length > 100 * 1000000)
            {
                ViewBag.Message = "File size too big (100mb max)";
                return View();
            }

            var test = Path.GetExtension(JsonFile.FileName).ToLower();
            // File Type
            if (Path.GetExtension(JsonFile.FileName).ToLower() != ".json")
            {
                ViewBag.Message = "File provided was not a proper LevelImposter map file";
                return View();
            }
            
            // Decode
            using (Stream stream = JsonFile.OpenReadStream())
            {
                byte[] bytes = new byte[JsonFile.Length];
                stream.Read(bytes, 0, (int)JsonFile.Length);

                Map.Json = Encoding.ASCII.GetString(bytes);

               

                try
                {
                    Newtonsoft.Json.JsonConvert.DeserializeObject<MapTemplate>(Map.Json);
                    service.AddMap(Map);
                    return RedirectToAction("Index");
                }
                catch
                {
                    ViewBag.Message = "File provided was not a proper LevelImposter map file";
                    return View();
                }
            }
        }
    }
}
