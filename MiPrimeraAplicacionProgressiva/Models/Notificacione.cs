using System;
using System.Collections.Generic;

namespace MiPrimeraAplicacionProgressiva.Models
{
    public partial class Notificacione
    {
        public int Iidnotificacion { get; set; }
        public string? Endpointnotificacion { get; set; }
        public string? Authnotificacion { get; set; }
        public string? P256dhnotificacion { get; set; }
        public int? Bhabilitado { get; set; }
    }
}
