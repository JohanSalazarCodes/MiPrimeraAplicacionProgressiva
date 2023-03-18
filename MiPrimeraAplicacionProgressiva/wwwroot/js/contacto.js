

async function SeleccionarContactos() {

    await seleccionarContacto((contact) => {

        var contenido = "<table class='table'>";
        contenido += `
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Numero</th>
                            </tr>
                        </thead>
                    `;
        contenido += "<tbody>";
        for (var i = 0; i < contact.length; i++) {

            contenido += `<tr>
                           <td>${contact[i].name[0]}</td> 
                           <td>${contact[i].tel[0]}</td> 
                            </tr>`;
        }
        contenido += "</tbody>";
        contenido += "</table>";
        setI("divContactos", contenido);
    });
}

async function seleccionarContacto(contactos) {

    const isSupported = ('contacts' in navigator && 'ContactsManager' in window);
    const availableProperties = await navigator.contacts.getProperties();
    if (isSupported && availableProperties.includes('tel')) {
        try {
            const props = ['icon', 'name', 'tel', 'email', 'address'];
            const opts = { multiple: true };
            const contacts = await navigator.contacts.select(props, opts);
            contactos(contacts);
        } catch {
            console.log("Ocurrio un error")
        }
    } else {
        console.log('No se puede acceder a la API de contactos')
    }


}