//Get current cookie
function getCookie(e) {
    for (var r = e + "=", n = document.cookie.split(";"), t = 0; t < n.length; t++) {
        for (var a = n[t];
            " " == a.charAt(0);) a = a.substring(1);
        if (0 == a.indexOf(r)) return a.substring(r.length, a.length);
    }
    return "";
}

//Fill out username field with cookie text
var usernameCookie = getCookie("usernameCookie");
if (usernameCookie !== "") {
    $("#loginForm").find("[name=username]").val(usernameCookie);
}