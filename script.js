// Hero keyword rotation (home page)
(function () {
  var kws = document.querySelectorAll('#kws span');
  if (!kws.length) return;
  var i = 0;
  function tick() {
    kws.forEach(function (s, idx) { s.classList.toggle('on', idx === i); });
    i = (i + 1) % kws.length;
  }
  tick(); setInterval(tick, 1600);
})();

// Active nav link based on current file
(function () {
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a.lnk').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();
