// Rising glass bubbles and a seaweed floor, as in the game's menus.
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Bubbles: rims tinted like BubbleFactory's five tints.
  var rims = ['rgba(170,215,255,.6)', 'rgba(190,170,255,.55)', 'rgba(255,215,160,.5)',
              'rgba(150,240,220,.5)', 'rgba(255,180,220,.5)'];
  var host = document.createElement('div');
  host.className = 'bubbles';
  host.setAttribute('aria-hidden', 'true');
  var count = reduce ? 0 : (innerWidth < 640 ? 10 : 18);
  for (var i = 0; i < count; i++) {
    var b = document.createElement('span');
    var s = 14 + Math.random() * 60;
    b.className = 'bubble';
    b.style.width = b.style.height = s + 'px';
    b.style.left = (Math.random() * 100) + '%';
    b.style.setProperty('--rim', rims[i % rims.length]);
    b.style.setProperty('--sway', ((Math.random() * 40) - 20) + 'px');
    b.style.animationDuration = (14 + Math.random() * 14) + 's';
    b.style.animationDelay = (-Math.random() * 28) + 's';
    host.appendChild(b);
  }
  document.body.insertBefore(host, document.body.firstChild);

  // Seafloor: sand mounds with swaying seaweed.
  var weedPaths = '';
  var xs = [4, 7, 10, 31, 47, 63, 81, 88, 92, 96];
  xs.forEach(function (x, i) {
    var h = 50 + ((i * 37) % 45);
    var X = x * 10;
    weedPaths += '<path class="weed" d="M' + X + ' 120 C' + (X - 10) + ' ' + (120 - h * .4) + ' ' + (X + 12) + ' ' +
      (120 - h * .7) + ' ' + (X + 2) + ' ' + (120 - h) + ' C' + (X + 8) + ' ' + (120 - h * .6) + ' ' + (X + 2) + ' ' +
      (120 - h * .3) + ' ' + (X + 9) + ' 120Z" fill="#1d5b69" opacity="' + (0.55 + (i % 3) * 0.15) + '"/>';
  });
  var svg = '<svg viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">' + weedPaths +
    '<path d="M0 104 Q120 88 260 100 T520 98 T780 96 T1000 102 V120 H0Z" fill="#0e1545"/>' +
    '<path d="M0 112 Q180 102 380 110 T760 108 T1000 112 V120 H0Z" fill="#0b1040"/></svg>';
  Array.prototype.forEach.call(document.querySelectorAll('.seafloor'), function (el) { el.insertAdjacentHTML('afterbegin', svg); });
})();
