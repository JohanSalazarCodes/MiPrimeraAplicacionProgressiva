using System;
using System.Collections.Generic;

namespace MiPrimeraAplicacionProgressiva.Models
{
    public partial class Button
    {
        public Button()
        {
            PaginaTipoUsuButtons = new HashSet<PaginaTipoUsuButton>();
        }

        public int Iidbutton { get; set; }
        public string? Nombrebutton { get; set; }
        public int? Bhabilitado { get; set; }

        public virtual ICollection<PaginaTipoUsuButton> PaginaTipoUsuButtons { get; set; }
    }
}
