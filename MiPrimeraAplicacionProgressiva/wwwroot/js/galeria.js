window.onload = function () {
    listarCard();

    paginaVisible(() => {
        document.location.href = "/Comentario/Index";
    });
}

var bc = new BroadcastChannel("TipoLibro");
bc.onmessage = (msg) => {
    var data = msg.data;
    var array = data.split("_");
    var id = array[0];
    var nombre = array[1];

    setI("cardtitle" + id, nombre);
}

function listarCard() {
    var contenido = "";
    var objActual;
    fetchGet("TipoLibro/listarTipoLibro", "json", function (data) {

        for (var i = 0; i < data.length; i++) {
            objActual = data[i];
            contenido +=`
                    <div class="col-md-4 col-sm-6 col-xl-3 mt-2 mb-2">
                    <div class="card m-auto" style="width: 18rem;">
                      <img style="height:200px;" src="${objActual.base64}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title" id="cardtitle${objActual.iidtipolibro}">${objActual.nombre}</h5>
                        <p class="card-text">${objActual.descripcion}</p>
<button class="btn btn-primary" onclick='Compartir("${objActual.nombre}", "${objActual.descripcion}","${objActual.base64}")'>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
</svg>
</button>
<button class="btn btn-primary" onclick='Copiar("${objActual.nombre}", "${objActual.descripcion}")'>

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
</svg>
</button>
<button class="btn btn-primary" onclick='Foto(this, "${objActual.nombre}")'>

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 16 16">
  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
</svg>
</button>
<button class="btn btn-primary" onclick='FullScreen(this)'>

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/>
</svg>
</button>
<button class="btn btn-primary" onclick='Escuchar("${objActual.nombre}", "${objActual.descripcion}")'>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ear" viewBox="0 0 16 16">
  <path d="M8.5 1A4.5 4.5 0 0 0 4 5.5v7.047a2.453 2.453 0 0 0 4.75.861l.512-1.363a5.553 5.553 0 0 1 .816-1.46l2.008-2.581A4.34 4.34 0 0 0 8.66 1H8.5ZM3 5.5A5.5 5.5 0 0 1 8.5 0h.16a5.34 5.34 0 0 1 4.215 8.618l-2.008 2.581a4.555 4.555 0 0 0-.67 1.197l-.51 1.363A3.453 3.453 0 0 1 3 12.547V5.5ZM8.5 4A1.5 1.5 0 0 0 7 5.5v2.695c.112-.06.223-.123.332-.192.327-.208.577-.44.72-.727a.5.5 0 1 1 .895.448c-.256.513-.673.865-1.079 1.123A8.538 8.538 0 0 1 7 9.313V11.5a.5.5 0 0 1-1 0v-6a2.5 2.5 0 0 1 5 0V6a.5.5 0 0 1-1 0v-.5A1.5 1.5 0 0 0 8.5 4Z"/>
</svg>
</button>
                      </div>
                    </div>

                    </div>
                    `
        }
        document.getElementById("contenido").innerHTML = contenido;
    });


}

function Escuchar(nombre, descripcion) {
    VozTexto("El tipo libro " + nombre + " " + descripcion);
}

function FullScreen(btn) {
    var div = btn.parentNode.parentNode.parentNode;
    FullScreenElement(div);
}

async function Foto(btn, nombreTipoLibro) {

    var div = btn.parentNode.parentNode.parentNode;
    await capturaPantalla(div, nombreTipoLibro);
}

function Copiar(nombre, descripcion) {
    escribirPortapapeles("Titulo: " + nombre + " Descripcion: " + descripcion);
}

function Compartir(nombre, descripcion, foto) {

    //compartirDatosAplicaciones(nombre, descripcion, "https://localhost:7046/Galeria")

    compartirImagen(nombre, descripcion, foto);
}

function VozTexto(texto) {
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis
        const utterThis = new SpeechSynthesisUtterance(texto)
        utterThis.pitch = 1;
        utterThis.rate = 1;
        utterThis.volume = 1;
        synth.speak(utterThis)
    } else {
        console.log("Web Speech API not supported :-(")
    }

}

function FullScreenElement(el) {
    if (!document.fullscreenElement) {
        el.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

async function capturaPantalla(html, nombre) {
    var data = await html2canvas(html)
    var image = data.toDataURL();
    var a = document.createElement("a")
    a.href = image;
    a.download = nombre;
    a.click();
}

async function escribirPortapapeles(texto) {
    const respuesta = await navigator.clipboard.writeText(texto);
    return respuesta;
}

async function leerPortapapeles() {
    const respuesta = await navigator.clipboard.readText();
    return respuesta;
}

async function compartirDatosAplicaciones(titulo, texto, url) {
    try {
        if (navigator.share) {
            await navigator.share({
                title: titulo,
                text: texto,
                url: url
            })
        }

    } catch (err) {
        console.log(" No se puede compartir " + err)
    }
}

async function b64toBlob(base64) {
    const base64Response = await fetch(base64);
    const blob = await base64Response.blob();
    return URL.createObjectURL(blob)
}


async function compartirImagen(titulo, texto, base64) {
    const urlBlob = await b64toBlob(base64);
    const img = await fetch(urlBlob);
    const blob = await img.blob();
    filesArray = [
        new File([blob], 'share.jpg', {
            type: 'image/jpeg',
            lastModified: new Date().getTime()
        })
    ];
    const dt = new DataTransfer();
    dt.items.add(filesArray[0]);
    var files = dt.files;
    if (navigator.canShare({ files })) {
        await navigator.share({
            title: titulo,
            text: texto,
            files
        });
    }

}
