using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LevelImposter.Models
{
    public class MapTemplate
    {
        public string name;
        public ObjTemplate[] objs;
    }

    public class ObjTemplate
    {
        public UInt64 id;
        public string name;
        public string spriteType;
        public string type;
        public float x;
        public float y;
        public float z;
        public float xScale;
        public float yScale;
        public float rotation;
    }
}
