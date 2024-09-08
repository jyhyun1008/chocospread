const jwt = require('jsonwebtoken');
const querystring = require("querystring");

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'chocospread',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/markdownit'],
  markdownit: {
    runtime: true // Support `$md()`
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  
  publicRuntimeConfig: {
    privateKey: process.env.PRIVATE_KEY,
    apiKey: process.env.API_KEY,
    sheetId: process.env.SPREADSHEET,
  },

  generate: {
    async routes(callback) {
      var secretKey = process.env.PRIVATE_KEY.replace(/\\n/gm, '\n')

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

      const googleSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/1iuIYp3-CKgSL1nGw3cODvomShDGNmNWN2xg6Wtho9Hg/`
      const googleSheetParam = {
          method: 'GET',
          headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + authRes.access_token,
          },
      }
      var sheetData3 = await fetch(googleSheetUrl, googleSheetParam)
      var sheetRes3 = await sheetData3.json()
      var wikiListArray = sheetRes3.sheets
      var wikiList = []
      for (let i=0; i<wikiListArray.length; i++) {
          wikiList.push('/'+encodeURIComponent(wikiListArray[i].properties.title))
      }
      const API_KEY = process.env.API_KEY.split('AIzaSy')[1];
  
      for (let i=0;i< API_KEY.length;i++) {
          wikiList.push('/API_KEY/AIzaSy'+API_KEY.slice(i, API_KEY.length)+API_KEY.slice(0, i))
      }

      const routes = wikiList
      callback(null, routes)
    }
  }
}
