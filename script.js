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

// Mobile menu — built from the existing nav so every page stays in sync
(function () {
  var nav = document.querySelector('header nav');
  if (!nav) return;
  var links = nav.querySelector('.nav-links');
  var book = nav.querySelector('.book');
  if (!links) return;

  var page = location.pathname.split('/').pop() || 'index.html';

  // Toggle button (hamburger / close)
  var toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-label', 'Toggle menu');
  toggle.setAttribute('aria-expanded', 'false');
  var iconMenu = '<svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  var iconClose = '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  toggle.innerHTML = iconMenu;
  nav.appendChild(toggle);

  // Dropdown panel, cloned from the desktop links
  var menu = document.createElement('div');
  menu.className = 'mobile-menu';
  links.querySelectorAll('a').forEach(function (a) {
    var item = document.createElement('a');
    item.href = a.getAttribute('href');
    item.textContent = a.textContent;
    if (a.getAttribute('href') === page) item.classList.add('active');
    menu.appendChild(item);
  });
  if (book) {
    var b = document.createElement('a');
    b.href = book.getAttribute('href');
    b.target = book.getAttribute('target') || '';
    b.rel = book.getAttribute('rel') || '';
    b.className = 'mm-book';
    b.textContent = book.textContent;
    menu.appendChild(b);
  }
  nav.appendChild(menu);

  function close() { menu.classList.remove('open'); toggle.innerHTML = iconMenu; toggle.setAttribute('aria-expanded', 'false'); }
  function open() { menu.classList.add('open'); toggle.innerHTML = iconClose; toggle.setAttribute('aria-expanded', 'true'); }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    menu.classList.contains('open') ? close() : open();
  });
  menu.addEventListener('click', function (e) { e.stopPropagation(); if (e.target.tagName === 'A') close(); });
  document.addEventListener('click', close);
  window.addEventListener('resize', function () { if (window.innerWidth > 900) close(); });
})();
