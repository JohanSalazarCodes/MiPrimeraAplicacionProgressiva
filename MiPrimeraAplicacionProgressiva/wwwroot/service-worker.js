importScripts("/js/pouchdb.min.js")

var nombreCacheEstatico = "cacheEstatico";
var nombreCacheDinamico = "cacheDinamico1";
var archivosEstaticos = [
    "/css/menu.css", "/MiPrimeraAplicacionProgressiva.styles.css", "/lib/jquery/dist/jquery.min.js",
    "/lib/bootstrap/dist/js/bootstrap.bundle.min.js", "/js/menu.js", "/", "/js/generic.js", "/img/loading.gif",
    "/Persona/listarPersonas", "/PaginaError/Index", "/js/sweetalert.js", "/js/pouchdb.min.js"
];

self.addEventListener("install", event => {


    console.log("Event Install");

    event.waitUntil(
        caches.open(nombreCacheEstatico).then(cache => {
            return cache.addAll(archivosEstaticos);
        })
    );

});


self.addEventListener("activate", event => {


    console.log("Event Activate");
    event.waitUntil(self.clients.claim());

});

self.addEventListener("fetch", event => {

    if (event.request.method != "POST") {
        const respuesta = fetch(event.request).then(response => {
            caches.open(nombreCacheDinamico).then(cache => {

                //if (!event.request.url.startsWith('http')) {
                    //skip request
                //}
               // else {
                    cache.put(event.request, response)
              //  }
            })
            return response.clone();
        }).catch(err => {
            return caches.match(event.request).then(res => {
                if (res) return res;
                else {
                    if (event.request.headers.get("accept").includes("text/html")) {
                        return caches.match("/PaginaError/Index");
                    }
                    else {
                        var response = new Response(`
        <h1 class="text-danger">Para realizar esta accion necesita internet</h1>
        `, {
                            headers: {
                                "Content-Type": "text/html"
                            }
                        });
                        return response;
                    }
                }
            })
        });

        //if (event.request.url == "https://localhost:7046/css/menu.css") {
        //    event.respondWith(null);
        //}

        //console.log(event.request.url);

        event.respondWith(respuesta);
    } else {

        if (self.registration.sync) {
            var respuesta = fetch(event.request.clone()).then(respose => {
                if (respose) return respose;
            }).catch(err => {
                return event.request.clone().formData().then(formData => {
                    //console.log(formData);

                    var db = new PouchDB("BDBiblioteca");
                    var objeto = Object.fromEntries(formData);

                    objeto._id = new Date().toISOString();
                    objeto.url = event.request.url;
                    return db.put(objeto).then(res => {

                        self.registration.sync.register("insertData")

                        return new Response("2", {
                            headers: {
                                "Content-Type": "text/plain"
                            }
                        });
                    });


                });
            });



            event.respondWith(respuesta);
        } else {
            event.respondWith(fetch(event.request));
        }

  
    }

   

});


self.addEventListener("sync", event => {

    console.log("Entro");
    var db = new PouchDB("BDBiblioteca");
    var respuesta = db.allDocs({ include_docs: true }).then(data => {
        data.rows.forEach(fila => {
            var doc = fila.doc;
            var frm = new FormData();
            for (var key in doc) {
                frm.append(key, doc[key]);
            }

            console.log(doc);
            return fetch(doc.url, {
                method: "POST",
                body: frm

            }).then(res => {
                db.remove(doc);
            });
        });
    });

    event.waitUntil(respuesta);
});


self.addEventListener("push", event => {

    var data = event.data.text();
    var valores = data.split("_");
    var titulo = valores[0];

    var opciones = {
        body: valores[1],
        icon: valores[2],
        vibrate: [200,100,200,100,200,100,200]
    };

    event.waitUntil(self.registration.showNotification(titulo, opciones));
});