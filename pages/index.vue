<template>
    <div id="app">
        <div id="wrapper">
            <div id="navbar">
                <a href="./"><div id="logo">{{ wikiTitle }}</div></a>
                <div id="member-info">
                    <div id="search"><input id="search-input"> <a id="search-button"><i class='bx bx-search'></i></a></div>
                    <div id="status"><span id="isLogin"><i class="bx bx-user-x" onclick="handleAuthClick()" ></i></span></div>
                </div>
            </div>
            <div id="sub-wrapper">
                <div id="title-box">
                    <h1 id="doc-title">{{ rawTitle }}</h1>
                </div>
                <div id="content-box">
                    <div id="content"></div>
                    <div id="content-hide" style="display: none;">{{ wikiBody }}</div>
                    
                </div>
                <div id="footer">
                    <!--Add buttons to initiate auth sequence and sign out-->
                    <button id="edit_button" onclick="handleEditClick()" style="display: none;">편집</button> <button id="history_button" onclick="handleHistoryClick()">역사</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

const jwt = require('jsonwebtoken');
const querystring = require("querystring");

export default {
    head () {
    return {
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js', defer: true },
        // { src: 'https://apis.google.com/js/api.js'},
        // { src: 'https://accounts.google.com/gsi/client'},
        // { src: 'js/settings.js', defer: true },
        { src: 'js/index.js', defer: true },
      ],
      link: [
        { href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', rel: 'stylesheet'},
        { href: 'css/main.css', rel: 'stylesheet'}
      ]
    }
  },
    async asyncData ({$config: { privateKey }}) {

        var wikiTitle = '샘플 위키'
        var rawTitle = '대문'

        var secretKey = privateKey.replace(/\\n/gm, '\n')

        const token = jwt.sign(
            { "iss": "samplewiki@musictart.iam.gserviceaccount.com", "scope": "https://www.googleapis.com/auth/spreadsheets", "aud": "https://oauth2.googleapis.com/token" },
            secretKey,
            { algorithm: 'RS256', expiresIn: "1h", keyid: "b7c157e4d406c1d29acc1783b7a36fea02ee5579" }
        );

        const googleAuthUrl = 'https://oauth2.googleapis.com/token'
        const googleAuthParam = {
                method: 'POST',
                headers: {
                    'content-type': "application/x-www-form-urlencoded",
                },
                body: querystring.stringify({
                    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                    assertion: token
                })
            }

        var authData = await fetch(googleAuthUrl, googleAuthParam)
        var authRes = await authData.json()

        const googleSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/1iuIYp3-CKgSL1nGw3cODvomShDGNmNWN2xg6Wtho9Hg/values/${rawTitle}!A:C`
        const googleSheetParam = {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + authRes.access_token,
            },
        }
        var sheetData = await fetch(googleSheetUrl, googleSheetParam)
        var sheetRes = await sheetData.json()
        var wikiBody = sheetRes.values
        
        for (let j=0; j<wikiBody.length; j++) {

            if (wikiBody[j][2].includes('![') && wikiBody[j][2].includes(']()')) {
                let includeArray = wikiBody[j][2].split('![').slice(1)
                for await (let including of includeArray) {
                    var including2 = including.split(']()')[0]
                    try {
                        const googleSheetUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/1iuIYp3-CKgSL1nGw3cODvomShDGNmNWN2xg6Wtho9Hg/values/${including2}!A:C`
                        var sheetData2 = await fetch(googleSheetUrl2, googleSheetParam)
                        var sheetRes2 = await sheetData2.json()
                        var content = sheetRes2.values[sheetRes2.values.length - 1][2]
                        wikiBody[j][2] = wikiBody[j][2].replace('!['+including2+']()', '!['+including2+']()<'+content+'>')
                    } catch (err) {
                        //console.log(err)
                    }
                }
            }

        }

        // var wikiBody1 = wikiBody.replace(/\\n/gm, '\n')
        // var wikiBody1 = wikiBody1.replace(/\[(.+)\]\(([^\:].+)\)/gm, `[$1](/$2)`)
        // var wikiBody1 = wikiBody1.replace(/\[(.+)\]\(\)/gm, `[$1](/$1)`)
        return { wikiTitle, rawTitle, wikiBody }
    }
}
</script>