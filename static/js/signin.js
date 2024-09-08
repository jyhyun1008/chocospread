
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {

    // TODO(developer): Set to client ID and API key from the Developer Console
    const API_KEY = document.querySelector('#footer').className.split('AIzaSy')[1];
    var API_KEY_conf = ''

    setTimeout(async () => {

        for (let i=0;i< API_KEY.length;i++) {
            try {
                var confirmAPI = await fetch('https://wiki.rongo.moe/API_KEY/AIzaSy'+API_KEY.slice(i, API_KEY.length)+API_KEY.slice(0, i))
                console.log(confirmAPI.status)
                if (confirmAPI.status != '404') {
                    API_KEY_conf = 'AIzaSy' + API_KEY.slice(i, API_KEY.length)+API_KEY.slice(0, i)
                }
                // var confirmData = await confirmAPI.text()
                // if (confirmData.split('<div>')[1].split('</div>')[0] === 'true') {
                //     
                // }
            } catch (err) {
                console.log(err)
            }
        }
    
        await gapi.client.init({
            apiKey: API_KEY_conf,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        });
    
        gapiInited = true;
    
        //maybeEnableButtons();
        
        handleAuthClick()
    }, 1000)

}


document.addEventListener("DOMContentLoaded", () => {
    gapiLoaded()
  });

function handleAuthClick() {

    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        var token = JSON.stringify(gapi.client.getToken())
        var tokenExpireDate = new Date()
        tokenExpireDate.setHours(tokenExpireDate.getHours() + 1);
        localStorage.setItem('googleToken', token)
        localStorage.setItem('tokenExpireDate', tokenExpireDate)

        await renderContent(title);
    };

    if ( gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({prompt: 'consent'});
        var token = JSON.stringify(gapi.client.getToken())
        var tokenExpireDate = new Date()
        tokenExpireDate.setHours(tokenExpireDate.getHours() + 1);
        localStorage.setItem('googleToken', token)
        localStorage.setItem('tokenExpireDate', tokenExpireDate)
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({prompt: ''});
    }
    
}

// function getQueryStringObject() {
//     var a = window.location.search.substr(1).split('&');
//     if (a == "") return {};
//     var b = {};
//     for (var i = 0; i < a.length; ++i) {
//         var p = a[i].split('=', 2);
//         if (p.length == 1)
//             b[p[0]] = "";
//         else
//             b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
//     }
//     return b;
// }

// var qs = getQueryStringObject()
// var code = qs.code

// localStorage.setItem('googleToken', code)
// //async function handleCredentialResponse(response) {
//     //console.log("Encoded JWT ID token: " + response.credential);
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