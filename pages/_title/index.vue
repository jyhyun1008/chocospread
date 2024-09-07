<template>
    <div v-html="$md.render(wikiBody1)"></div>
</template>

<script>

const jwt = require('jsonwebtoken');
const querystring = require("querystring");

export default {
    async asyncData ({params, $config: { privateKey }}) {
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

        const googleSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/1iuIYp3-CKgSL1nGw3cODvomShDGNmNWN2xg6Wtho9Hg/values/${params.title}!A:C`
        const googleSheetParam = {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + authRes.access_token,
            },
        }
        var sheetData = await fetch(googleSheetUrl, googleSheetParam)
        var sheetRes = await sheetData.json()
        var wikiBody = sheetRes.values[sheetRes.values.length - 1][2]
        var wikiBody1 = wikiBody.replace(/\\n/gm, '\n')
        var wikiBody1 = wikiBody1.replace(/\[(.+)\]\(([^\:].+)\)/gm, `[$1](../$2)`)
        var wikiBody1 = wikiBody1.replace(/\[(.+)\]\(\)/gm, `[$1](/$1)`)
        return { wikiBody1 }
    }
}
</script>