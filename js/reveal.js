/* Puentina: kleine Helfer für alle Seiten.
   1. Filter im Ratgeber (Blog-Archiv): Karten nach Thema ein- und ausblenden.
   2. Elemente mit data-reveal sanft einblenden, sobald sie ins Bild scrollen.
   Ohne dieses Skript ist alles sichtbar; bei „Bewegung reduzieren“ gibt es keine Animation. */
(function () {
  /* 1 · Filter */
  var bar = document.querySelector('.filter-bar');
  if (bar) {
    document.documentElement.classList.add('has-filter');
    var buttons = bar.querySelectorAll('button[data-filter]');
    var cards = document.querySelectorAll('.post-card[data-cat]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
        cards.forEach(function (c) {
          /* „es“ filtert nach Sprache (lang="es"), alle anderen Werte nach Thema */
          var match = f === 'alle' || (f === 'es' ? c.getAttribute('lang') === 'es' : c.getAttribute('data-cat') === f);
          c.hidden = !match;
        });
      });
    });
  }

  /* 2 · Einblenden */
  var items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return; /* nichts verstecken */
  document.documentElement.classList.add('js');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  items.forEach(function (el) { io.observe(el); });
})();
