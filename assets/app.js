/* ============================================================
   BEHIND THE BOOKING — interactions
   ============================================================ */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var views = [].slice.call(document.querySelectorAll('.view'));
  var navLinks = [].slice.call(document.querySelectorAll('[data-nav]'));
  var statusLabel = document.getElementById('statusLabel');
  var tripBar = document.getElementById('tripBar');

  var order = ['overview', 'route', 'stays', 'playbook', 'console', 'coldstart', 'notes', 'contact'];
  var labels = {
    overview: 'departures — start here',
    route: 'the route — career & experience',
    stays: 'stays — case studies, reviewed',
    playbook: 'playbook — how i think',
    console: 'connect console — partner dashboard concept',
    coldstart: 'cold start — the activation note for connect',
    notes: 'field notes — short essays',
    contact: 'check-in — get in touch'
  };

  /* ---------- ROUTING ---------- */
  function show(id) {
    if (order.indexOf(id) === -1) id = 'overview';
    views.forEach(function (v) { v.hidden = (v.id !== id); });
    navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
    statusLabel.textContent = 'now boarding: ' + labels[id];
    var pct = ((order.indexOf(id) + 1) / order.length) * 100;
    if (tripBar) tripBar.style.width = pct + '%';
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    runReveals(); runCounts(); animateConsole(); closeNav();
  }
  function route() { show((location.hash || '#overview').slice(1)); }
  window.addEventListener('hashchange', route);

  /* ---------- MOBILE NAV ---------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navLinks');
  function closeNav() { navMenu.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); }
  navToggle.addEventListener('click', function () {
    var open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  /* ---------- HERO: flip the boarding pass ---------- */
  var pass = document.getElementById('pass');
  var flipBtn = document.getElementById('flipBtn');
  var heroLine = document.getElementById('heroLine');
  function toggleFlip() {
    var f = pass.classList.toggle('flipped');
    heroLine.classList.toggle('flipped', f);
    pass.setAttribute('aria-pressed', String(f));
    flipBtn.setAttribute('aria-pressed', String(f));
  }
  if (pass) {
    pass.addEventListener('click', toggleFlip);
    flipBtn.addEventListener('click', toggleFlip);
    // one-time auto-demo so the mechanic is discovered
    if (!reduceMotion) {
      setTimeout(toggleFlip, 2200);
      setTimeout(toggleFlip, 4200);
    }
  }

  /* ---------- THE ROUTE: career map ---------- */
  var stops = [
    { when: '2016 — 2020 · Delhi', where: 'DTU · B.Tech, Computer Science', role: 'Where I learned to build',
      body: "Computer science first. It gave me the engineer's instinct I still lead with — I read systems, not just screens, and I know what a model actually costs." },
    { when: '2020 — 2023 · Gurugram', where: 'PolicyBazaar · Product & Applied ML', role: 'Where I learned to ship',
      body: "Three years turning models into a product people used. I owned a 0→1 AI health-insurance chatbot end to end — personas, PRDs, a north-star, six sprints — and watched a funnel teach me more than any framework could." },
    { when: '2023 — 2025 · Kozhikode', where: 'IIM Kozhikode · MBA', role: 'Where I learned to decide',
      body: "The MBA reframed the work: not how to build, but what's worth building. Market sizing, business cases, and the discipline of saying no to good ideas to protect the right one." },
    { when: '2024 — now · Mumbai', where: 'L&T, then Crisil · AI & BFSI Product Strategy', role: 'Where I do both',
      body: "A forex risk model at L&T in six weeks. Then Crisil — AI roadmaps and business cases for 10+ initiatives, an internal QA product shipped and adopted across teams, and an Analytical Excellence Award for the firm's first InvIT assessment." },
    { when: 'next · destination pending', where: 'MakeMyTrip · Hotels Connect', role: 'The room I\'d like to be in', isNext: true,
      body: "The supply side of a real marketplace, full-time. Hotel partners, inventory, activation, trust. Everything the trip so far has been quietly preparing for. PNR pending — I wrote Cold Start while I wait." }
  ];
  var stopCard = document.getElementById('stopCard');
  var pins = [].slice.call(document.querySelectorAll('.pin'));
  function renderStop(i) {
    var s = stops[i];
    stopCard.className = 'stop-card' + (s.isNext ? ' is-next' : '');
    stopCard.innerHTML =
      '<span class="sc-when">' + s.when + '</span>' +
      '<div class="sc-where">' + s.where + '</div>' +
      '<div class="sc-role">' + s.role + '</div>' +
      '<p class="sc-body">' + s.body + '</p>';
    pins.forEach(function (p, idx) { p.classList.toggle('active', idx === i); });
  }
  pins.forEach(function (p) {
    p.addEventListener('click', function () { renderStop(parseInt(p.getAttribute('data-stop'), 10)); });
  });
  if (stopCard) renderStop(0);

  /* ---------- COUNT-UP ---------- */
  var counted = new WeakSet();
  function runCounts() {
    document.querySelectorAll('.view:not([hidden]) [data-count]').forEach(function (el) {
      if (counted.has(el)) return; counted.add(el);
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduceMotion) { el.textContent = target + suffix; return; }
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1000, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- CONSOLE: gauge + bars ---------- */
  function animateConsole() {
    var consoleView = document.getElementById('console');
    if (!consoleView || consoleView.hidden) return;
    var arc = document.getElementById('gaugeArc');
    if (arc) {
      var val = 68, len = 157;
      // set directly — the CSS transition animates from the empty default
      arc.style.strokeDashoffset = String(len * (1 - val / 100));
    }
    document.querySelectorAll('#console .chart-card').forEach(function (c) { c.classList.add('in'); });
  }

  /* ---------- REVEAL ---------- */
  var io = ('IntersectionObserver' in window && !reduceMotion) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  function runReveals() {
    document.querySelectorAll('.view:not([hidden]) .reveal:not(.in)').forEach(function (el) {
      if (io) io.observe(el); else el.classList.add('in');
    });
  }

  /* ---------- ACCORDIONS (stays + notes) ---------- */
  function wire(headSel, itemSel) {
    document.querySelectorAll(headSel).forEach(function (h) {
      h.addEventListener('click', function () {
        var item = h.closest(itemSel);
        var open = item.classList.toggle('open');
        h.setAttribute('aria-expanded', String(open));
      });
    });
  }
  wire('.stay-head', '.stay');
  wire('.note-head', '.note');

  /* ---------- STAYS: sort ---------- */
  var sortChips = [].slice.call(document.querySelectorAll('.chip[data-sort]'));
  sortChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      sortChips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var by = chip.getAttribute('data-sort');
      var container = document.querySelector('#stays .wrap');
      var stays = [].slice.call(document.querySelectorAll('#stays .stay'));
      stays.sort(function (a, b) {
        return by === 'recent'
          ? (+b.getAttribute('data-year')) - (+a.getAttribute('data-year'))
          : (+b.getAttribute('data-impact')) - (+a.getAttribute('data-impact'));
      });
      stays.forEach(function (s) { container.appendChild(s); });
    });
  });

  /* ---------- COLD START: cross-highlight ---------- */
  var hurts = [].slice.call(document.querySelectorAll('.hurt'));
  hurts.forEach(function (h) {
    h.addEventListener('mouseenter', function () {
      hurts.forEach(function (o) { o.classList.toggle('lit', o === h); o.classList.toggle('dim', o !== h); });
    });
    h.addEventListener('mouseleave', function () { hurts.forEach(function (o) { o.classList.remove('lit', 'dim'); }); });
  });

  /* ---------- PRD EASTER EGG ---------- */
  var modal = document.getElementById('prdModal');
  var versionTag = document.getElementById('versionTag');
  var prdClose = document.getElementById('prdClose');
  function openPRD() { modal.hidden = false; prdClose.focus(); }
  function closePRD() { modal.hidden = true; versionTag.focus(); }
  versionTag.addEventListener('click', openPRD);
  prdClose.addEventListener('click', closePRD);
  modal.addEventListener('click', function (e) { if (e.target === modal) closePRD(); });

  var lastKey = '', lastTime = 0;
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) { closePRD(); return; }
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    var now = Date.now();
    if (e.key === 'p' && lastKey === 'g' && now - lastTime < 800) { openPRD(); lastKey = ''; return; }
    if (e.key === 'f' && location.hash === '#overview') { toggleFlip(); }
    lastKey = e.key; lastTime = now;
  });

  /* ---------- MOBILE STICKY CTA ---------- */
  var cta = document.createElement('div');
  cta.className = 'mobile-cta';
  cta.innerHTML = '<a href="mailto:pmadhav204@gmail.com">Check in — start a conversation →</a>';
  document.body.appendChild(cta);

  route();
})();
