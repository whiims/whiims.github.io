const boothBannerLine = document.getElementsByClassName("boothbanner__underline")[0]
const boothBanner = document.getElementById("boothbanner")

boothBanner.addEventListener('mouseover', function(){
    boothBannerLine.classList.toggle('boothbanner__underline_hover')
})
boothBanner.addEventListener('mouseout', function(){
    boothBannerLine.classList.toggle('boothbanner__underline_hover')
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