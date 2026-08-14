/* ---------------------------------------------------------------
   Let the Enter key unlock a password-protected post.

   hexo-blog-encrypt only decrypts when its "Decrypt" button is
   clicked. Typing the password and pressing Enter — the natural
   thing to do, and what happens automatically on a phone keyboard —
   silently does nothing, which reads as "the password is wrong".
   --------------------------------------------------------------- */

/* ---------------------------------------------------------------
   Show pictures inside password-protected posts.

   Fluid lazy-loads images: it writes the real photo into src and a
   loading spinner into srcset, then removes srcset once the image
   scrolls into view. That sweep runs once, at page load. An
   encrypted post is only inserted into the page after the reader
   types the password, so its pictures are never picked up and stay
   stuck on the spinner forever.

   hexo-blog-encrypt fires "hexo-blog-decrypt" on window when a post
   is unlocked, so re-run the lazy-loader over whatever just appeared.
   --------------------------------------------------------------- */

(function () {
  window.addEventListener('hexo-blog-decrypt', function () {
    var images = document.querySelectorAll('img[lazyload]');

    for (var i = 0; i < images.length; i++) {
      (function (img) {
        var reveal = function () {
          img.removeAttribute('srcset');
          img.removeAttribute('lazyload');
        };

        if (window.Fluid && Fluid.utils && Fluid.utils.waitElementVisible) {
          var offset = (window.CONFIG && CONFIG.lazyload && CONFIG.lazyload.offset_factor);
          Fluid.utils.waitElementVisible(img, reveal, offset);
        } else {
          reveal();
        }
      })(images[i]);
    }
  });
})();

(function () {
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.keyCode !== 13) return;

    var input = document.getElementById('hbePass');
    if (!input || document.activeElement !== input) return;

    var button = document.querySelector('.hbe-button');
    if (!button) return;

    e.preventDefault();
    button.click();
  });
})();
