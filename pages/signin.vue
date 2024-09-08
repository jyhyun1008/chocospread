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
                    <h1 id="doc-title">로그인</h1>
                </div>
                <div id="content-box">
                    <div id="content"></div>
                    
                </div>
                <div id="footer" :class="apiKey">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

const jwt = require('jsonwebtoken');
const querystring = require("querystring");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default {
    head () {
    return {
        meta: [
        {"http-equiv": "Content-Security-Policy"},
        {content: "upgrade-insecure-requests"}
        ],
      script: [
        // { src: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js', defer: true },
        { src: 'https://apis.google.com/js/api.js'},
        // { src: 'https://cdn.jsdelivr.net/npm/http-querystring-stringify@2.1.0/index.js' },
        // { src: 'https://accounts.google.com/gsi/client'},
        // { src: 'js/settings.js', defer: true },
        { src: 'js/signin.js?v=15', defer: true },
      ],
      link: [
        { href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', rel: 'stylesheet'},
        { href: 'css/main.css', rel: 'stylesheet'}
      ]
    }
  },
    async asyncData ({$config: { privateKey }}) {

        var wikiTitle = '샘플 위키'

        var secretKey = privateKey.replace(/\\n/gm, '\n')
        var apiKey = ''

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

        const configUrl = `https://sheets.googleapis.com/v4/spreadsheets/1iuIYp3-CKgSL1nGw3cODvomShDGNmNWN2xg6Wtho9Hg/values/CONFIG!F2`
        const googleSheetParam = {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + authRes.access_token,
            },
        }

        var configData = await fetch(configUrl, googleSheetParam)
        var configRes = await configData.json()
        apiKey = configRes.values[0][0].split('AIzaSy')[1]
        var randomInt = getRandomInt(apiKey.length)
        apiKey = 'AIzaSy' + apiKey.slice(randomInt) + apiKey.slice(0, randomInt)

        return { wikiTitle, apiKey }
    }
}
</script>