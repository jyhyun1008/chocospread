
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
var code = qs.code

localStorage.setItem('googleToken', code)

async function getAccess(){
    const getAccessTokenUrl = 'https://oauth2.googleapis.com/token'
    const getAccessTokenParam = {
        method: 'POST',
        headers: {
            'content-type': "application/x-www-form-urlencoded",
        },
        body: stringify({
            code: code,
            client_id: '876385603351-6dho403hu41litd5us9bedkjed165g4f.apps.googleusercontent.com',
            client_secret: document.querySelector('#footer').className,
            redirect_uri: location.origin+'/signin/',
            grant_type: 'authorization_code'
        })
    }

    var accessData = await fetch(getAccessTokenUrl, getAccessTokenParam)
    var accessRes = await accessData.json()
    console.log(accessRes)
}

getAccess()

//async function handleCredentialResponse(response) {
    //console.log("Encoded JWT ID token: " + response.credential);
// async function getUserInfo() {
//     const userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo"
//     const userInfoParam = {
//         method: 'GET',
//         headers: {
//             Authorization: "Bearer " + code,
//         },
//     }
//     var userData = await fetch(userInfoUrl, userInfoParam)
//     var userRes = await userData.json()
//     console.log(userRes)
// }

// getUserInfo()

//     const googleAuthUrl = 'https://oauth2.googleapis.com/token'
//     const googleAuthParam = {
//             method: 'POST',
//             headers: {
//                 'content-type': "application/x-www-form-urlencoded",
//             },
//             body: stringify({
//                 grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
//                 assertion: response.credential
//             })
//         }

//     var authData = await fetch(googleAuthUrl, googleAuthParam)
//     var authRes = await authData.json()

//     console.log(authRes.access_token)
//   }
//   window.onload = function () {
//     google.accounts.id.initialize({
//       client_id: "876385603351-6dho403hu41litd5us9bedkjed165g4f.apps.googleusercontent.com",
//       callback: handleCredentialResponse
//     });
//     google.accounts.id.renderButton(
//       document.getElementById("buttonDiv"),
//       { theme: "outline", size: "large" }  // customization attributes
//     );
//     google.accounts.id.prompt(); // also display the One Tap dialog
//   }