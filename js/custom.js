/* ---------------------------------------------------------------
   Let the Enter key unlock a password-protected post.

   hexo-blog-encrypt only decrypts when its "Decrypt" button is
   clicked. Typing the password and pressing Enter — the natural
   thing to do, and what happens automatically on a phone keyboard —
   silently does nothing, which reads as "the password is wrong".
   --------------------------------------------------------------- */

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
