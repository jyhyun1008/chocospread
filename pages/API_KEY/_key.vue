<template>
    <div>{{ isKey }}</div>
</template>

<script>
export default {
    head () {
        return {
            script: [
                { src: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js', defer: true },
                // { src: 'https://apis.google.com/js/api.js'},
                // { src: 'https://accounts.google.com/gsi/client'},
                // { src: '../js/settings.js', defer: true },
                { src: '../js/index.js', defer: true },
            ],
            link: [
                { href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', rel: 'stylesheet'},
                { href: '../css/main.css', rel: 'stylesheet'}
            ]
        }
    },
    async asyncData ({ params , $config: { apiKey }}) {

        var isKey
        if (params.key == apiKey) {
            isKey = 'true'
        } else {
            isKey = 'false'
        }

        return { isKey }
    }
}
</script>