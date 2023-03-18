using Microsoft.AspNetCore.Mvc;

namespace MiPrimeraAplicacionProgressiva.Controllers
{
    public class PaginaErrorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
