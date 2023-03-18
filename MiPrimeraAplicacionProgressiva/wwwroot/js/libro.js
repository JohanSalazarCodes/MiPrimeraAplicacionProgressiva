window.onload = function () {
    listarLibro();
    startListening(function (texto) {
        if (texto == "open") {
            document.getElementById("btnNuevo").click();
        }
        else if (texto == "close") {
            document.getElementById("btnCerrar").click();
        }
    });
}

function listarLibro() {

    fetchGet("Autor/listarAutor", "json", function (rpta) {
        llenarCombo(rpta, "cboautor", "iidautor", "nombreautor");
    });

    pintar({
        url: "Libro/listarLibros",
        propiedades: ["base64", "titulo"],
        cabeceras: ["Foto", "Libro"],
        //titlePopup: "Libro",
        type: "popup",
        rowClickRecuperar: true,
        propiedadId: "iidlibro",
        columnaimg: ["base64"],
        callbackrecuperar: function (id) {
            setI("lblTitulo", "Editar Libro");
            LimpiarDatos("frmLibro");
            document.getElementById("videoFoto").srcObject = null;
            document.getElementById("videoFoto").poster = "";
            recuperarGenerico("Libro/recuperarLibro/?iidlibro=" + id, "frmLibro", function (data) {
                document.getElementById("videoFoto").poster = data.base64;
            });
        }
    }
    )
}

function Nuevo() {
    LimpiarDatos("frmLibro");
    document.getElementById("videoFoto").srcObject = null;
    document.getElementById("videoFoto").poster = "";
    setI("lblTitulo", "Agregar Libro");
}

function startListening(callback) {
    var recognition = new (webkitSpeechRecognition || SpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
    recognition.onresult = function () {
        callback(event.results[event.results.length - 1][0].transcript.trim());
    };
}


function GuardarDatos() {
    var frmLibro = document.getElementById("frmLibro");
    var frm = new FormData(frmLibro);
    var fotoTomada = obtenerImagenVideo('videoFoto');
    frm.append("base64", fotoTomada);

    var errores = ValidarDatos("frmLibro");
    if (errores != "") {
        Error(errores);
        if (navigator.vibrate) {
            navigator.vibrate([2000]);
        }
        return;
    }
    Confirmacion("Confirmacion", "Desea guardar cambios?", function () {
        fetchPost("Libro/guardarDatos", "text", frm, function (rpta) {
            if (rpta == 1) {
                Exito("Se guardo correctamente");
                listarLibro();
                document.getElementById("btnCerrar").click();
            }
            else {

            }
        });
    });


}

function IniciarCamara(idvideo) {
    if (navigator.mediaDevices) {
        var videoFoto = document.getElementById(idvideo)
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }
        ).then(stream => {
            videoFoto.srcObject = stream;
        }).catch(err => {
            alert(err)
        });
    }
}



function obtenerImagenVideo(idvideo) {
    const video = document.getElementById(idvideo);
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL();
    return dataURL
}
function ApagarCamara(idvideo) {
    var videoObject = document.getElementById(idvideo)
    videoObject.pause()
    videoObject.srcObject.getTracks()[0].stop()
}


