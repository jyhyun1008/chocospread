<template>
    <div>{{ wikiBody.sheets[0].properties.title }}</div>
</template>

<script>

const jwt = require('jsonwebtoken');
const secretKey = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbdF6WPh5oX0ok\nwENrMv915c7Sd01I/7D0f+AXrTWiEcGMzFJ/rvFtdiItfj6Argjq/+F3hjmmzgV3\nK8b00m3no7kvJhVPN4Ue9XGS32tiw4XYiq5299VD8Y1TbFok2H5vGEx/meBQHms+\nm+tt5Gxt44l1xgp6cCK9Jh4QjqB3g4lsNpVjrHrXp9NXk7FtDy7jOfwdT3Ohrlr3\nVUM9BQDEOoNkepJav9kJKUYtRnJGujBDB4Gvh4L4W/tiSeIjsySvMNy5lREuCl5y\nfInOjAYtYnbazYTUyiq7hHClvm7gMVjMPEqANDZ/NxEDv+9dZwCUkoTn9Dv16bEQ\nzz2H8Z4RAgMBAAECggEAAR7jAhlnG66rjkHSa6W4WuhwL0WfW2loL0IdPtcKQxLx\neL/tBpc6HGOnYQbCrZ2LO3KlusUws4Kx0cijch9GTbyETD1W4S9Yuq5o2hB8rTsa\nX99gF14Z9LLdvzilF9290jYUOJfskVGBHVy7zbUw6I6/kPO7R0zIoKFP3f3HIVUZ\niUMVT6TO+HdhBhX5EFAb7ttNySkwgW8Hqnh1Ggu/MCLT1qtcZ+RA9Q/Qei13cEJ8\nq9UaMxELqAsrWFaQNGZ1q2WuKe1++LjJg08+oYJz7On7MBm/En30tyJIwdONFxfZ\nzo66Pdw3b3lmGykoWe/qhV/Ta7yQRC9/5HLxE+CpUQKBgQDzrVi/MBqjEh6jHSrx\nHvQ2Wdb6r/YEL0dEjoUgVorDRBub7CYZRSUBc4rxgQ95YFpW26Rv7MhWxGF5jecH\ndbY3zl6OQfu98Ofe+MvN9lVum4qnkA51uhGQ2m0CcW7air9N07N1CDTMjS/evdRl\n2FfTEKpuXariA44f2KX8YvrhkwKBgQDmjW/BwcHRsmZkJL0JAsEHm08iuqCTLWdE\nLZA1YkI4fY8dZpVvdPkLnTAFopGHY18jGo5kPrwR3zQXHWFrR/9r98HQTACrS5kj\nm8nEcmmCor472dcmYVQ8O5wafH1I4HRqBWJ8ST2oZaksvtV436CtCcLDPc3wUmjE\nQTZdld1YSwKBgQCUuBFX7kXzjJWCO8T/kELAASjBqy7c8vXuE4WQbQEXl7O5//Bo\nr9icACamqnwFOhcot7iuTrcerZBIHaEI3oCtopf2/rJkBGmfnfzU4SjW7rs69SK+\nGyepXoX1XcGoQ9Hp7/Cw1qdSyECVEwpUditzt9IstaIbesv9B76WQNqZXQKBgDut\neLQqt0TUbPSXHedrMxQI+579t/rg0c4wDRgEaye8OINfvmavXJfJBFkxD4KAEmw/\nv4PrSTtHD3C8Ri9C37bO1vhX9ARi+SzicoPLKcyK27saVDq3DtrYgzvH5ZYro3ae\nFjQdsTwZtITEkPVMzYZ89FEdemUur7e9OZlX5YepAoGAQUvHdZ8MXsN3d/XWX+V+\nDmCiipqj2GxySg3sk/bTs+ClbI2w16yqUf482jqnIZbfYkk2NloeB7FNYRAfV2u+\n4AUq73r/gK+oRebIV5EuL3g47sqJG3fbFDbIBMELPx8xuNX4tNZclQFl2nYOWH2J\n87gpWaVmM8SMW7n3GdnU3OM=\n-----END PRIVATE KEY-----\n"

const token = jwt.sign(
    { "iss": "samplewiki@musictart.iam.gserviceaccount.com", "scope": "https://www.googleapis.com/auth/spreadsheets", "aud": "https://oauth2.googleapis.com/token" },
    secretKey,
    { algorithm: 'RS256', expiresIn: "1h", keyid: "b7c157e4d406c1d29acc1783b7a36fea02ee5579" }
    );

const querystring = require("querystring");

export default {
    async asyncData () {

        const googleAuthUrl = 'https://oauth2.googleapis.com/token'
        const googleAuthParam = {
                                    method: 'POST',
                                    headers: {
                                        'content-type': "application/x-www-form-urlencoded",
                                    },
                                    wikiBody: querystring.stringify({
                                        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                                        assertion: token
                                    })
                                }

        var authData = await fetch(googleAuthUrl, googleAuthParam)
        var authRes = await authData.json()
        console.log(authRes)

        const googleSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1iuIYp3-CKgSL1nGw3cODvomShDGNmNWN2xg6Wtho9Hg'
        const googleSheetParam = {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + authRes.access_token,
            },
        }
        var sheetData = await fetch(googleSheetUrl, googleSheetParam)
        var wikiBody = await sheetData.json()
        return { wikiBody }
    }
}
</script>