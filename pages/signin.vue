<template>
    <div id="app">
        <div id="wrapper">
            <div id="navbar">
                <a id="wikiUrl" :href="wikiUrl"><div id="logo">{{ wikiTitle }}</div></a>
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
                <div id="footer">
                    <div id="cid" :class="clientId">
                        <div id="sc" :class="clientSecret"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    head () {
    return {
        meta: [
        {"http-equiv": "Content-Security-Policy"},
        {content: "upgrade-insecure-requests"}
        ],
      script: [
        // { src: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js', defer: true },
        // { src: 'https://apis.google.com/js/api.js'},
        { src: 'https://cdn.jsdelivr.net/npm/http-querystring-stringify@2.1.0/index.js' },
        // { src: 'https://accounts.google.com/gsi/client'},
        // { src: 'js/settings.js', defer: true },
        { src: 'js/signin.js?v=25', defer: true },
      ],
      link: [
        { href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', rel: 'stylesheet'},
        { href: 'css/main.css', rel: 'stylesheet'}
      ]
    }
  },
    async asyncData ({$config: { clientSecret }, $config: { clientId }, $config: { wikiUrl }, $config: { wikiTitle }}) {

        wikiUrl = 'https://'+wikiUrl

        return { wikiTitle, clientSecret, clientId, wikiUrl }
    }
}
</script>