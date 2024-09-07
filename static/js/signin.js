
async function handleCredentialResponse(response) {
    //console.log("Encoded JWT ID token: " + response.credential);

    const googleAuthUrl = 'https://oauth2.googleapis.com/token'
    const googleAuthParam = {
            method: 'POST',
            headers: {
                'content-type': "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({
                grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion: response.credential
            })
        }

    var authData = await fetch(googleAuthUrl, googleAuthParam)
    var authRes = await authData.json()

    console.log(authRes.access_token)
  }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "876385603351-6dho403hu41litd5us9bedkjed165g4f.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }