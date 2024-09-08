function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

var qs = getQueryStringObject()
var edit = qs.e
var version = qs.v

var googleToken = ''
var googleEmail = ''
var expireDate = new Date()

document.querySelector('#isLogin').innerHTML = '<i class="bx bx-user-x" onclick="handleAuthClick()" ></i>'

if (localStorage.getItem('googleToken')) {
    googleToken = localStorage.getItem('googleToken')
    googleEmail = localStorage.getItem('googleEmail')
    expireDate = Date.parse(localStorage.getItem('tokenExpireDate'))
    document.querySelector('#edit_button').style = "display: inline;"
    document.querySelector('#isLogin').innerHTML = '<i class="bx bx-user-voice" onclick="handleSignoutClick()" ></i>'
    if (expireDate < new Date()){
        localStorage.removeItem('googleToken')
        localStorage.removeItem('googleEmail')
        localStorage.removeItem('expireDate')
        googleToken = ''
        googleEmail = ''
        expireDate = new Date()
        document.querySelector('#edit_button').style = "display: none;"
        document.querySelector('#isLogin').innerHTML = '<i class="bx bx-user-x" onclick="handleAuthClick()" ></i>'
    }
}

document.querySelector('#search-button').href = './'
document.querySelector('#search-input').addEventListener("input", (e) => {
    document.querySelector('#search-button').href= "./?d="+document.querySelector('#search-input').value
})

document.querySelector('#search-input').addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        location.href= "./?d="+document.querySelector('#search-input').value
    }
})

const title = document.getElementById('doc-title').innerText
var wikiJSON = JSON.parse(document.querySelector("#content-hide").innerText)

function parseWiki(text) {
    var text = text.replace(/\\n\\n/gm, '\n\n')
    text = text.replace(/\\n/gm, '\n')
    var markdown = marked.parse(text)
    markdown = markdown.replace(/href\=\"([^\"\:]+)\"\>([^\<]+)\</gm, 'href="./$1">$2<')
    markdown = markdown.replace(/href\=\"\"\>([^\<]+)\</gm, 'href="./$1">$1<')
    markdown = markdown.replace(/\.\/([^\"\:\<\>]+)\/([^\"\:\<\>\/]+)\"/gm, './$1%2F$2"')

    return markdown
}

function handleEditClick() {
    location.href="./"+title+"?e=true"
}

function handleHistoryClick() {
    location.href="./"+title+"?v=list"
}

function handleAuthClick() {
    location.href="https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fspreadsheets&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https%3A%2F%2Fwiki.rongo.moe%2Fsignin%2F&client_id=876385603351-6dho403hu41litd5us9bedkjed165g4f.apps.googleusercontent.com"
}

function simpleParse(text) {
    text = text.replace(/\\n\\n/gm, '\n\n')
    text = text.replace(/\\n/gm, '\n')
    var markdown = marked.parse(text)
    markdown = markdown.replace(/href\=\"([^\"\:]+)\"\>([^\<]+)\</gm, 'href="./?d=$1">$2<')
    markdown = markdown.replace(/href\=\"\"\>([^\<]+)\</gm, 'href="./?d=$1">$1<')
    return markdown
}

function changePostDisabled(e) {
    document.querySelector('#wordcount').innerText = e.value.length
    document.querySelector('#post-preview').innerHTML = simpleParse(e.value)
    if (e.value != '' ) {
        document.querySelector('#post-button').disabled = false
    } else {
        document.querySelector('#post-button').disabled = true
    }
}

async function editDocs(range, title, input, email, at) {

    input = input.replace(/\n/gm, '\\n')
    let values = [
        [
            range,
            new Date(),
            input,
            email
        ]
    ]
    let body = JSON.stringify({
        values: values
    })
    var appendDocsUrl = `https://sheets.googleapis.com/v4/spreadsheets/1iuIYp3-CKgSL1nGw3cODvomShDGNmNWN2xg6Wtho9Hg/values/${title}:append?valueInputOption=RAW`
    var appendDocsParam = {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + at,
        },
        body: body
    }
    var appendDocs = await fetch(appendDocsUrl, appendDocsParam)
    var appendDocsRes = await appendDocs.json()
    console.log(appendDocsRes)
    beforeUnloadAlert = false

    location.href="./"
}

if (version == 'list') {
    document.getElementById('content').innerHTML = '<div>변경 기록</div><table id="version-list"><thead><tr><td>버전</td><td>변경 날짜</td><td>편집자</td><td>작업 수행</td></tr></thead><tbody></tbody></table>';
    for (var i=0; i<wikiJSON.length - 1; i++) {
        document.querySelector('#version-list>tbody').innerHTML += '<tr><td>v'+(wikiJSON.length-1-i)+'</td><td>'+wikiJSON[(wikiJSON.length-1-i)][1]+'</td><td>'+wikiJSON[(wikiJSON.length-1-i)][3]+'</td><td><a href="./'+title+'?v='+(wikiJSON.length-1-i)+'">읽기</a> · <a href="./'+title+'?e=true&v='+(wikiJSON.length-1-i)+'">이 버전으로부터 편집</a></td></tr>';
    }
} else if (version && !edit) {
    document.querySelector("#content").innerHTML = parseWiki(wikiJSON[version][2].replace(/\!\[([^\[\]].+)\]\(\)\<([^\>]+)\>/gm, '$2'))
} else if (!version && !edit) {
    document.querySelector("#content").innerHTML = parseWiki(wikiJSON[wikiJSON.length - 1][2].replace(/\!\[([^\[\]].+)\]\(\)\<([^\>]+)\>/gm, '$2'))
} else if (edit && !version) {
    if (googleToken == '') {
        location.href="./"+title
    } 
    document.getElementById('content').innerHTML = '<div id="post-label">'+title+' 편집: <span id="wordcount"></span></div><textarea id="post-input" oninput="changePostDisabled(this)">'+wikiJSON[wikiJSON.length - 1][2].replace(/\\n/gm, '&#010;').replace(/\!\[([^\[\]].+)\]\(\)\<([^\>]+)\>/gm, '![$1]()')+`</textarea><button id="post-button" disabled="true" onclick="editDocs(${JSON.stringify(wikiJSON.length - 1)},'${title}',document.querySelector('#post-input').value, '${googleEmail}', '${googleToken}')">편집 완료!</button><div id="post-preview"></div>`;
    
    window.addEventListener('beforeunload', function (e) {
        if (!beforeUnloadAlert) return;
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = '';
    });
}