using Microsoft.AspNetCore.Mvc;

namespace MiPrimeraAplicacionProgressiva.Controllers
{
    public class ContactosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
