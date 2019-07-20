var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 200,
  offset: 50,
  easing: 'easeInOutCubic'
});

var mySwiper = new Swiper ('.swiper-container', {
  // オプションパラメータ(一部のみ抜粋)
  loop: true, // 最後のスライドまで到達した場合、最初に戻らずに続けてスライド可能にするか。
  speed: 600, // スライドが切り替わるトランジション時間(ミリ秒)。
  slidesPerView: 1, // 何枚のスライドを表示するか
  spaceBetween: 4, // スライド間の余白サイズ(ピクセル)
  direction: 'horizontal', // スライド方向。 'horizontal'(水平) か 'vertical'(垂直)。effectオプションが 'slide' 以外は無効。
  effect: 'slide', // "slide", "fade"(フェード), "cube"(キューブ回転), "coverflow"(カバーフロー) または "flip"(平面回転)

  // スライダーの自動再生
  // autoplay: true 　のみなら既定値での自動再生
  autoplay: {
    delay: 3000, // スライドが切り替わるまでの表示時間(ミリ秒)
    stopOnLast: false, // 最後のスライドまで表示されたら自動再生を中止するか
    disableOnInteraction: true // ユーザーのスワイプ操作を検出したら自動再生を中止するか
  },

  // ページネーションを表示する場合
  pagination: {
    el: '.swiper-pagination',　 // ページネーションを表示するセレクタ
  },

  // 前後スライドへのナビゲーションを表示する場合
  navigation: {
    nextEl: '.swiper-button-next', // 次のスライドボタンのセレクタ
    prevEl: '.swiper-button-prev', // 前のスライドボタンのセレクタ
  }
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