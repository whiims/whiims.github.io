var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 200,
  offset: 50,
  easing: 'easeInOutCubic'
});

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
  const new_url = originalURL.replace(/\#.*$/,"");
  const url = encodeURIComponent(new_url);
  const hashtag = encodeURIComponent(" #抵抗カラーコードかるた\n");

  const twitterLink = "http://twitter.com/share?url=" + url + "&text=" + hashtag;
  document.getElementById("twitter").href = twitterLink;

  const facebookLink = "https://www.facebook.com/share.php?u=" + url
  document.getElementById('facebook').href = facebookLink;
})