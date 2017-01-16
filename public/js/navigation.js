//This code highlight the active tab in the navigation bar
var pathname = window.location.pathname;
var d;
if (/login/.test(pathname)) {
    d = document.getElementById("loginTab");
} else if (/signup/.test(pathname)) {
    d = document.getElementById("signupTab");
} else if (/profile/.test(pathname)) {
    d = document.getElementById("perfilTab");
} else if (/reminders/.test(pathname)) {
    d = document.getElementById("recordatoriosTab");
}
//Resorces
else if (/resources/.test(pathname)) {
    d = document.getElementById("agregarDatosTab");
    document.getElementById("administradorTab").className += " active";
}
//Vehicles
else if (/vehicles/.test(pathname)) {
    if (/add/.test(pathname)) {
        d = document.getElementById("agregarVehiculosTab");
        document.getElementById("administradorTab").className += " active";
    } else {
        d = document.getElementById("vehiculosTab");
    }
}
d.className += " active";