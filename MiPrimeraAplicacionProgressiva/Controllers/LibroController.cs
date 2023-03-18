using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAplicacionProgressiva.Clases;
using MiPrimeraAplicacionProgressiva.Models;
namespace MiPrimeraAplicacionProgressiva.Controllers
{
    public class LibroController : Controller
    {
        private readonly IWebHostEnvironment _env;

        public LibroController(IWebHostEnvironment env)
        {
            _env = env;
        }
        public IActionResult Index()
        {
            return View();
        }

        public LibroCLS recuperarLibro(int iidlibro)
        {
            LibroCLS oLibroCLS = new LibroCLS();
            using (db_a96211_dbbibliotecaContext db = new())
            {
                Libro oLibro = db.Libros.First(p => p.Iidlibro == iidlibro);
                oLibroCLS.iidlibro = iidlibro;
                oLibroCLS.titulo = oLibro.Titulo;
                oLibroCLS.resumen = oLibro.Resumen;
                oLibroCLS.numeropaginas = (int)oLibro.Numpaginas;
                oLibroCLS.stock = (int)oLibro.Stock;
                oLibroCLS.iidautor = (int)oLibro.Iidautor;
                oLibroCLS.base64 = oLibro.Archivo == null ? "" : "data:image/png;base64," + Convert.ToBase64String(oLibro.Archivo);


            }
            return oLibroCLS;
        }

        public int guardarDatos(LibroCLS oLibroCLS)
        {
            int rpta = 0;

            string basefoto = oLibroCLS.base64.Replace("data:image/png;base64,", "");
            byte[] buffer = null;

            if (oLibroCLS.base64 != "data:,")
            {
                buffer = Convert.FromBase64String(basefoto);
            }

            using (db_a96211_dbbibliotecaContext db = new())
            {
                try
                {
                    if (oLibroCLS.iidlibro == 0)
                    {
                        Libro oLibro = new Libro()
                        {
                            Titulo = oLibroCLS.titulo,
                            Resumen = oLibroCLS.resumen,
                            Numpaginas = oLibroCLS.numeropaginas,
                            Stock = oLibroCLS.stock,
                            Iidautor = oLibroCLS.iidautor,
                            Bhabilitado = 1,
                            Archivo = buffer != null? buffer: null
                        };
                        db.Libros.Add(oLibro);
                        db.SaveChanges();
                        rpta = 1;
                    }
                    else
                    {
                        Libro oLibro = db.Libros.First(p => p.Iidlibro == oLibroCLS.iidlibro);
                        oLibro.Titulo = oLibroCLS.titulo;
                        oLibro.Resumen = oLibroCLS.resumen;
                        oLibro.Numpaginas = oLibroCLS.numeropaginas;
                        oLibro.Stock = oLibroCLS.stock;
                        oLibro.Iidautor = oLibroCLS.iidautor;
                        oLibro.Archivo = buffer != null ? buffer : null;
                        db.SaveChanges();
                        rpta = 1;
                    }

                }
                catch (Exception ex)
                {
                    rpta = 0;
                }
            }


            return rpta;
        }

        public List<LibroCLS> listarLibros()
        {
            List<LibroCLS> lista = new List<LibroCLS>();

            string rutaCompleta = Path.Combine(_env.ContentRootPath, "wwwroot/img/nofoto.png");
            byte[] buffer = System.IO.File.ReadAllBytes(rutaCompleta);
            string base64nofoto = Convert.ToBase64String(buffer);
            string base64nofotofinal = "data:image/png;base64," + base64nofoto;

            using (db_a96211_dbbibliotecaContext db = new())
            {
                lista = (from libro in db.Libros
                         join autor in db.Autors on libro.Iidautor equals autor.Iidautor
                         where libro.Bhabilitado == 1
                         select new LibroCLS
                         {
                             iidlibro = libro.Iidlibro,
                             titulo = "<h6>" + libro.Titulo + "</h6><p class='mb-1'>" + autor.Nombre + " " +
                             autor.Apmaterno + "</p>" + "<p class='text-secondary mb-1'>Stock: " + libro.Stock + "</p>",
                             numeropaginas = (int)libro.Numpaginas,
                             base64 = libro.Archivo == null ? base64nofotofinal :
                                  $"data:image/png;base64," +
                                  $"{Convert.ToBase64String(libro.Archivo)}"
                         }).ToList();
            }

            return lista;
        }

    }
}
