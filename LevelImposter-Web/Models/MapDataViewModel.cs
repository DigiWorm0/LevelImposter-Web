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
        public static readonly char[] ID_STR = { 'A', 'B', 'C', 'D' };

        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Likes { get; set; }

        public MapDataViewModel(MapData data)
        {
            this.Name = data.Name;
            this.Description = data.Description;
            this.Likes = data.Likes;
            this.Id = IdToString(data.Id);
        }

        public static string IdToString(int id)
        {
            if (id < 0)
                return string.Empty;

            int index = id;
            string output = string.Empty;

            for (int i = 0; i < 6; i++)
            {
                output += ID_STR[index % ID_STR.Length];
                index /= ID_STR.Length;
            }

            return output;
        }

        public static int StringToId(string str)
        {
            if (str.Length != 6)
                return -1;

            int index = 0;
            char[] chars = str.ToCharArray();

            for (int i = 0; i < 6; i++)
            {
                char character = chars[i];
                int id = Array.IndexOf(ID_STR, character);

                if (id < 0)
                    return -1;

                index += id * (int)Math.Pow(ID_STR.Length, i);
            }

            return index;
        }
    }
}
