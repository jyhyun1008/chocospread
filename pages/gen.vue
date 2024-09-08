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
                    <h1 id="doc-title">새 문서 생성</h1>
                </div>
                <div id="content-box">
                    <div id="content"></div>
                </div>
                <div id="footer">
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
        { src: 'js/gen.js?v=0', defer: true },
      ],
      link: [
        { href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', rel: 'stylesheet'},
        { href: 'css/main.css', rel: 'stylesheet'}
      ]
    }
  },
    async asyncData ({ $config: { wikiUrl }, $config: { wikiTitle }}) {

        wikiUrl = 'https://'+wikiUrl

        return { wikiTitle, wikiUrl }
    }
}
</script>