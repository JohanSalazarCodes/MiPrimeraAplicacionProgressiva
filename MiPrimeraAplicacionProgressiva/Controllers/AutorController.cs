using Microsoft.AspNetCore.Mvc;
using MiPrimeraAplicacionProgressiva.Clases;
using MiPrimeraAplicacionProgressiva.Models;
using System.Collections.Generic;

namespace MiPrimeraAplicacionProgressiva.Controllers
{
    public class AutorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public List<AutorCLS> listarAutor()
        {
            List<AutorCLS> lista = new();
            using (db_a96211_dbbibliotecaContext db = new())
            {
                lista = (from autor in db.Autors
                         where autor.Bhabilitado == 1
                         select new AutorCLS
                         {
                             iidautor = autor.Iidautor,
                             nombreautor = autor.Nombre + " " + autor.Apmaterno + " " + autor.Apmaterno
                         }).ToList();
                return lista;
            }
        }
    }
}
