(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('.rail-item'));
  if (!items.length) return;

  var targets = items
    .map(function (item) {
      return { item: item, el: document.getElementById(item.getAttribute('data-target')) };
    })
    .filter(function (t) { return t.el; });

  if (!targets.length) return;

  function setActive() {
    var line = window.scrollY + window.innerHeight * 0.3;
    var current = targets[0];
    for (var i = 0; i < targets.length; i++) {
      var top = targets[i].el.getBoundingClientRect().top + window.scrollY;
      if (top <= line) {
        current = targets[i];
      }
    }
    targets.forEach(function (t) {
      var isActive = t === current;
      t.item.classList.toggle('active', isActive);
      if (isActive) {
        t.item.setAttribute('aria-current', 'true');
      } else {
        t.item.removeAttribute('aria-current');
      }
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      setActive();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  setActive();
})();
