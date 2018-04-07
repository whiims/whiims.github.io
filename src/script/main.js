const popup = document.getElementsByClassName("popup")[0]
const twitterButton = document.getElementById("twitter")
const facebookButton = document.getElementById("facebook")

twitterButton.addEventListener('mouseover', function() {
    popup.classList.toggle('share-open')
})
twitterButton.addEventListener('mouseout', function() {
    popup.classList.toggle('share-open')
})

facebookButton.addEventListener('mouseover', function() {
    popup.classList.toggle('share-open')
})
facebookButton.addEventListener('mouseout', function() {
    popup.classList.toggle('share-open')
})

Document.prototype.ready = function(callback) {
    if(callback && typeof callback === 'function') {
        document.addEventListener("DOMContentLoaded", function() {
            if(document.readyState === "interactive" || document.readyState === "complete") {
                return callback()
            }
        });
    }
};

document.ready(function() {
    const originalURL = document.URL
    const url = encodeURIComponent(originalURL);
    const hashtag = encodeURIComponent(" #gitかるた\n");

    const twitterLink = "http://twitter.com/share?url=" + url + "&text=" + hashtag;
    document.getElementById('twitter').href = twitterLink;

    const facebookLink = "https://www.facebook.com/share.php?u=" + url
    document.getElementById('facebook').href = facebookLink;
})