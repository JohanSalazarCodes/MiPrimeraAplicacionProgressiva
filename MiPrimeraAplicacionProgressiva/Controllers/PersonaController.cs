using Microsoft.AspNetCore.Mvc;
using MiPrimeraAplicacionProgressiva.Clases;
using MiPrimeraAplicacionProgressiva.Models;

namespace MiPrimeraAplicacionProgressiva.Controllers
{
    public class PersonaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public List<PersonaCLS> listarPersonas(string? nombreCompleto = null)
        {
            List<PersonaCLS> lista = new List<PersonaCLS>();

            using (db_a96211_dbbibliotecaContext db = new())
            {
                if (nombreCompleto == null)
                {
                    lista = (from persona in db.Personas
                                 where persona.Bhabilitado == 1
                                 select new PersonaCLS
                                 {
                                     idPersona = persona.Iidpersona,
                                     nombreCompleto = $"{persona.Nombre} {persona.Appaterno} {persona.Apmaterno}",
                                     correo = persona.Correo
                                 }).ToList();
                }
                else
                {
                    lista = (from persona in db.Personas
                                 where persona.Bhabilitado == 1 &&
                                 (persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno).Contains(nombreCompleto)
                                 select new PersonaCLS
                                 {
                                     idPersona = persona.Iidpersona,
                                     nombreCompleto = $"{persona.Nombre} {persona.Appaterno} {persona.Apmaterno}",
                                     correo = persona.Correo
                                 }).ToList();
                }

               

                return lista;
            }
        }
    }
}
