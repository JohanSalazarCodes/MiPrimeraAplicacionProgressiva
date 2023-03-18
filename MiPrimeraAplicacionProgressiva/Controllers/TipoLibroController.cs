using Microsoft.AspNetCore.Mvc;
using MiPrimeraAplicacionProgressiva.Clases;
using MiPrimeraAplicacionProgressiva.Models;
namespace MiPrimeraAplicacionProgressiva.Controllers
{
    public class TipoLibroController : Controller
    {
        private readonly IWebHostEnvironment _env;

        public TipoLibroController(IWebHostEnvironment env)
        {
            _env = env;
        }
        public IActionResult Index()
        {
            return View();
        }

        public List<TipoLibroCLS> listarTipoLibro(string nombretipolibrobusqueda)
        {
            List<TipoLibroCLS> lista = new List<TipoLibroCLS>();

            string rutaCompleta = Path.Combine(_env.ContentRootPath, "wwwroot/img/nofoto.png");
            byte[] buffer = System.IO.File.ReadAllBytes(rutaCompleta);
            string base64nofoto = Convert.ToBase64String(buffer);
            string base64nofotofinal = "data:image/png;base64," + base64nofoto;
            using (db_a96211_dbbibliotecaContext db = new())
            {
                if (nombretipolibrobusqueda == null)
                {
                    lista = (from tipoLibro in db.TipoLibros
                             where tipoLibro.Bhabilitado == 1
                             select new TipoLibroCLS
                             {
                                 iidtipoLibro = tipoLibro.Iidtipolibro,
                                 nombre = tipoLibro.Nombretipolibro,
                                 descripcion = tipoLibro.Descripcion,
                                 base64 = tipoLibro.Nombrearchivo == null? base64nofotofinal:
                                 $"data:/image/{Path.GetExtension(tipoLibro.Nombrearchivo).Replace(".", "")};base64," +
                                 $"{Convert.ToBase64String(tipoLibro.Archivo)}"
                }).ToList();
                }
                else
                {
                    lista = (from tipoLibro in db.TipoLibros
                             where tipoLibro.Bhabilitado == 1 &&
                             tipoLibro.Nombretipolibro.Contains(nombretipolibrobusqueda)
                             select new TipoLibroCLS
                             {
                                 iidtipoLibro = tipoLibro.Iidtipolibro,
                                 nombre = tipoLibro.Nombretipolibro,
                                 descripcion = tipoLibro.Descripcion,
                                 base64 = tipoLibro.Nombrearchivo == null ? base64nofotofinal :
                                 $"data:/image/{Path.GetExtension(tipoLibro.Nombrearchivo).Replace(".", "")};base64," +
                                 $"{Convert.ToBase64String(tipoLibro.Archivo)}"
                             }).ToList();
                }

                return lista;
            }
        }

        public TipoLibroCLS recuperarTipoLibro(int id)
        {
            using (db_a96211_dbbibliotecaContext db = new())
            {
                TipoLibroCLS otipoLibroCLS = new();
                TipoLibro oTipoLibro = db.TipoLibros.First(x => x.Iidtipolibro == id);

                otipoLibroCLS.iidtipoLibro = oTipoLibro.Iidtipolibro;
                otipoLibroCLS.nombre = oTipoLibro.Nombretipolibro;
                otipoLibroCLS.descripcion = oTipoLibro.Descripcion;
                otipoLibroCLS.base64 = oTipoLibro.Archivo == null? "" : 
                    $"data:/image/{Path.GetExtension(oTipoLibro.Nombrearchivo)};base64," +
                    $"{Convert.ToBase64String(oTipoLibro.Archivo).Replace(".", "")}";

                return otipoLibroCLS;
            }
        }

        public int guardarTipoLibro(TipoLibroCLS oTipoLibroCLS, IFormFile fotoEnviar)
        {
            int rpta = 0;

            byte[] buffer;
            string nombreFoto = "";
            if (fotoEnviar != null)
            {
                using(MemoryStream ms = new())
                {
                    fotoEnviar.CopyTo(ms);
                    nombreFoto = fotoEnviar.FileName;
                    buffer = ms.ToArray();
                    oTipoLibroCLS.foto = buffer;
                    oTipoLibroCLS.nombreFoto = nombreFoto;

                }
            }

            using (db_a96211_dbbibliotecaContext db = new())
            {
                try
                {
                    if (oTipoLibroCLS.iidtipoLibro == 0)
                    {
                        TipoLibro oTipoLibro = new();
                        oTipoLibro.Nombretipolibro = oTipoLibroCLS.nombre;
                        oTipoLibro.Descripcion = oTipoLibroCLS.descripcion;
                        oTipoLibro.Bhabilitado = 1;
                        oTipoLibro.Archivo = oTipoLibroCLS.foto;
                        oTipoLibro.Nombrearchivo = oTipoLibroCLS.nombreFoto;
                        db.TipoLibros.Add(oTipoLibro);
                        db.SaveChanges();
                        rpta = 1;
                    }
                    else
                    {
                        TipoLibro oTipoLibro = db.TipoLibros.First(x => x.Iidtipolibro == oTipoLibroCLS.iidtipoLibro);
                        oTipoLibro.Nombretipolibro = oTipoLibroCLS.nombre;
                        oTipoLibro.Descripcion = oTipoLibroCLS.descripcion;

                        if (nombreFoto != "")
                        {
                            oTipoLibro.Archivo = oTipoLibroCLS.foto;
                            oTipoLibro.Nombrearchivo = oTipoLibroCLS.nombreFoto;
                        }
                            db.SaveChanges();
                        rpta = 1;
                    }
                }
                catch(Exception ex)
                {
                    rpta = 0;
                }
           
            }


            return rpta;
        }
    }
}
