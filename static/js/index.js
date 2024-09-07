var text = document.querySelector("#content-hide").innerText.replace(/\\n\\n/gm, '\n\n')
text = text.replace(/\\n/gm, '\n')
var markdown = marked.parse(text)
markdown = markdown.replace(/href\=\"([^\"\:]+)\"\>([^\<]+)\</gm, 'href="./$1">$2<')
markdown = markdown.replace(/href\=\"\"\>([^\<]+)\</gm, 'href="./$1">$1<')
markdown = markdown.replace(/\.\/([^\"\:\<\>]+)\/([^\"\:\<\>\/]+)\"/gm, './$1%2F$2"')

document.querySelector("#content").innerHTML = markdown