(function () {
  var d = document, h = d.documentElement;
  h.classList.add('js');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // mobile menu
  var t = d.querySelector('.nav-toggle'), n = d.querySelector('.nav');
  if (t && n) t.addEventListener('click', function () {
    var o = n.classList.toggle('open');
    t.setAttribute('aria-expanded', o);
  });

  // count-up numbers
  function count(el) {
    el.querySelectorAll('[data-count]').forEach(function (b) {
      var end = parseFloat(b.dataset.count), p = b.dataset.prefix || '', s = b.dataset.suffix || '';
      if (rm) { b.textContent = p + end + s; return; }
      var t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var k = Math.min((ts - t0) / 1500, 1), e = 1 - Math.pow(1 - k, 3);
        b.textContent = p + Math.round(end * e) + s;
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // reveal on scroll
  var els = d.querySelectorAll('.rv,.gauge');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); count(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    els.forEach(function (e) { io.observe(e); });
  } else {
    els.forEach(function (e) { e.classList.add('in'); });
  }

  // rotating role line
  var r = d.querySelector('.rot');
  if (r && !rm) {
    var list = r.dataset.roles.split('|'), i = 0;
    setInterval(function () {
      r.classList.add('out');
      setTimeout(function () { i = (i + 1) % list.length; r.textContent = list[i]; r.classList.remove('out'); }, 350);
    }, 2800);
  }

  // photo lightbox
  var zs = d.querySelectorAll('.zoom');
  if (zs.length) {
    var dlg = d.createElement('dialog');
    dlg.innerHTML = '<img alt=""><button type="button" aria-label="Close">\u2715</button>';
    d.body.appendChild(dlg);
    var im = dlg.querySelector('img');
    zs.forEach(function (z) {
      z.addEventListener('click', function () {
        var src = z.querySelector('img');
        im.src = src.src; im.alt = src.alt;
        if (dlg.showModal) dlg.showModal();
      });
    });
    dlg.addEventListener('click', function () { dlg.close(); });
  }

  // contact form -> opens the visitor's email app
  var f = d.getElementById('mf');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    var nm = f.elements.name.value, em = f.elements.email.value, ms = f.elements.msg.value;
    var body = ms + '\n\n' + nm + (em ? ' (' + em + ')' : '');
    location.href = 'mailto:arunroshanas@gmail.com?subject=' +
      encodeURIComponent('Opportunity for Arun Roshan A S') + '&body=' + encodeURIComponent(body);
  });
})();
