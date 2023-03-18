using Microsoft.AspNetCore.Mvc;
using MiPrimeraAplicacionProgressiva.Clases;
using MiPrimeraAplicacionProgressiva.Models;
using WebPush;

namespace MiPrimeraAplicacionProgressiva.Controllers
{
    public class NotificacionController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public string generarLlavePublica()
        {
            return Notificaciones.llavePublica;
        }

        public async Task<int> enviarNotificaciones(string parametroPorContenido)
        {
            int rpta = 0;
            string subject = "mailto:johan.itcr@gmail.com";
            string clavePublica = Notificaciones.llavePublica;
            string clavePrivada = Notificaciones.llavePrivada;

            PushSubscription oPushSubscription;
            var vapidDetail = new VapidDetails(subject, clavePublica, clavePrivada);
            var webpushClient = new WebPushClient();

            try
            {
                using (db_a96211_dbbibliotecaContext db = new())
                {
                    var lista = db.Notificaciones.ToList();
                    foreach (var oNotificacion in lista)
                    {
                        try
                        {
                            oPushSubscription = new PushSubscription(oNotificacion.Endpointnotificacion,
                                oNotificacion.P256dhnotificacion,
                                oNotificacion.Authnotificacion);

                            await webpushClient.SendNotificationAsync(oPushSubscription, parametroPorContenido,
                                vapidDetail);

                            rpta = 1;
                        }
                        catch (WebPushException ex)
                        {
                            if (ex.StatusCode.ToString() == "Gone")
                            {
                                db.Remove(oNotificacion);
                                db.SaveChanges();
                                rpta = 1;
                            }

                        }
                    }
                }
            }
            catch(Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }

        public int guardarSubscripcion(SubscripcionCLS osubscripcionCLS)
        {
            int rpta = 0;
            try
            {
                using (db_a96211_dbbibliotecaContext db = new())
                {
                    Notificacione oNotificacione = new Notificacione();
                    oNotificacione.Endpointnotificacion = osubscripcionCLS.endpoint;
                    oNotificacione.Authnotificacion = osubscripcionCLS.auth;
                    oNotificacione.P256dhnotificacion = osubscripcionCLS.p256dh;
                    oNotificacione.Bhabilitado = 1;
                    db.Notificaciones.Add(oNotificacione);
                    db.SaveChanges();
                    rpta = 1;

                }
            }
            catch (Exception ex)
            {
                rpta = 0;
            }

            return rpta;
        }
    }
}
