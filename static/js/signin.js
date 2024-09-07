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
//async function handleCredentialResponse(response) {
    //console.log("Encoded JWT ID token: " + response.credential);

    const url = 'https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fspreadsheets&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https%3A%2F%2Fwiki.rongo.moe%2Flogin&client_id=876385603351-6dho403hu41litd5us9bedkjed165g4f.apps.googleusercontent.com'
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