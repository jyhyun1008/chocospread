
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
var token = qs.token

if (!token) {
   // location.href = document.querySelector('#wikiUrl').href
} else {
    //localStorage.setItem('googleToken', token)
    getAccess()
}

async function getAccess(){
    console.log(token)
    // const getAccessTokenUrl = 'https://oauth2.googleapis.com/token'
    // const getAccessTokenParam = {
    //     method: 'POST',
    //     headers: {
    //         'content-type': "application/x-www-form-urlencoded",
    //     },
    //     body: stringify({
    //         code: code,
    //         client_id: document.querySelector('#cid').className,
    //         client_secret: document.querySelector('#sc').className,
    //         redirect_uri: document.querySelector('#wikiUrl').href+'signin/',
    //         grant_type: 'authorization_code'
    //     })
    // }

    // var accessData = await fetch(getAccessTokenUrl, getAccessTokenParam)
    // var accessRes = await accessData.json()
    // var tokenExpireDate = new Date()
    // tokenExpireDate.setHours(tokenExpireDate.getHours() + 1);
    // localStorage.setItem('googleToken', accessRes.access_token)
    // localStorage.setItem('tokenExpireDate', tokenExpireDate)

    // const userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo"
    // const userInfoParam = {
    //     method: 'GET',
    //     headers: {
    //         Authorization: "Bearer " + accessRes.access_token,
    //     },
    // }
    // var userData = await fetch(userInfoUrl, userInfoParam)
    // var userRes = await userData.json()
    // localStorage.setItem('googleEmail', userRes.email)

   // location.href = document.querySelector('#wikiUrl').href
}