using System;
using System.Collections.Generic;

namespace MiPrimeraAplicacionProgressiva.Models
{
    public partial class TipoLibro
    {
        public int Iidtipolibro { get; set; }
        public string? Nombretipolibro { get; set; }
        public string? Descripcion { get; set; }
        public int? Bhabilitado { get; set; }
        public string? Nombrearchivo { get; set; }
        public byte[]? Archivo { get; set; }
    }
}
