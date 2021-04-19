using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LevelImposter.Controllers
{
    public class DocsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
