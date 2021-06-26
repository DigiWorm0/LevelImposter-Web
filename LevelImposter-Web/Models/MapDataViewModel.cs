using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LevelImposter.Models
{
    public class MapDataViewModel
    {
        [Newtonsoft.Json.JsonIgnore]
        public readonly char[] ID_STR = { 'A', 'B', 'C', 'D' };

        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Likes { get; set; }

        public MapDataViewModel(MapData data)
        {
            this.Name = data.Name;
            this.Description = data.Description;
            this.Likes = data.Likes;
            this.Id = string.Empty;

            // Assign ID
            int index = data.Id;
            for (int i = 0; i < 6 || index != 0; i++)
            {
                this.Id += ID_STR[index % ID_STR.Length];
                index /= ID_STR.Length;
            }
        }
    }
}
