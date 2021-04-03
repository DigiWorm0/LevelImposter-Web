using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LevelImposter.Models
{
    public class MapData
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int likes { get; set; }
        public string mapJson { get; set; }
    }
}
