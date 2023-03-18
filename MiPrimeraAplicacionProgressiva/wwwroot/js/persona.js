
window.onload = function () {
    listarTipoLibro();
   // activarNotificaciones();
}

//function activarNotificaciones() {

//    if (window.Notification) {
//        if (Notification.permission != "granted") {
//            Notification.requestPermission(function (rpta) {
//                console.log(rpta);
//                if (rpta == "granted") {
//                    new Notification("Mi Primera Notificacion", {
//                        body: "Esta notificacion lo vimos en el curso de PWA",
//                        icon: "/img/Icon-192.png"
//                    });
//                }
//            });
//        }
//    }

//}

function listarTipoLibro() {
    pintar({
        url: "Persona/listarPersonas",
        propiedades: ["nombreCompleto", "correo"],
        cabeceras: ["Nombre Completo", "Correo"]
    }, {
        url: "Persona/listarPersonas",
        formulario: [
            [
                {
                    class: "col-md-6",
                    label: "Nombre Completo",
                    name: "nombreCompleto",
                    type: "text"
                }
             ]
        ]
    }
    )
}