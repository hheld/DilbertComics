document.addEventListener('DOMContentLoaded', function () {
    getLatestComic();
}, false);

function getLatestComic() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var xmlDoc = xhttp.responseXML;
            var currentComic = parseComic(xmlDoc);

            setTitleAndImg(currentComic);

            var i = 0

            var nextBtn = document.getElementById('next');
            var prevBtn = document.getElementById('previous');

            prevBtn.addEventListener('click', function () {
                if (i + 1 < xmlDoc.getElementsByTagName('entry').length) {
                    setTitleAndImg(parseComic(xmlDoc, ++i));
                }
            });

            nextBtn.addEventListener('click', function () {
                if (i > 0) {
                    setTitleAndImg(parseComic(xmlDoc, --i));
                }
            });
        }
    };
    xhttp.open('GET', 'http://comicfeeds.chrisbenard.net/view/dilbert/default', true);
    xhttp.send();
}

function parseComic(xmlDoc, entryNo = 0) {
    var firstEntry = xmlDoc.getElementsByTagName('entry')[entryNo];
    var id = firstEntry.childNodes[1].textContent;
    var content = firstEntry.childNodes[9].textContent;

    return {
        date: id,
        img: content
    };
}

function setTitleAndImg(currentComic) {
    var header = document.getElementById('date');
    header.innerHTML = currentComic.date;

    var imgContainer = document.getElementById('img');
    imgContainer.innerHTML = currentComic.img;

    var img = document.getElementsByTagName('img')[0];
    img.width = 600;
}
