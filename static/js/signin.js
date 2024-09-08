
function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

var qs = getQueryStringObject()
var token = qs.access_token

if (!token) {
    location.href = document.querySelector('#wikiUrl').href
} else {
    localStorage.setItem('googleToken', token)
    getAccess()
}

async function getAccess(){
    var tokenExpireDate = new Date()
    tokenExpireDate.setHours(tokenExpireDate.getHours() + 1);
    localStorage.setItem('tokenExpireDate', tokenExpireDate)

    const userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo"
    const userInfoParam = {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + token,
        },
    }
    var userData = await fetch(userInfoUrl, userInfoParam)
    var userRes = await userData.json()
    localStorage.setItem('googleEmail', userRes.email)

   location.href = document.querySelector('#wikiUrl').href
}