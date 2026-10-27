(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var SUPABASE_URL = 'https://lkylzmlzhlhublwrvfmi.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_uHUE7ldD5Bo8b4x3C_129w_fh6oasnj';
  var WHATSAPP = 'https://wa.me/919740018911';

  // Year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Ticker: build two identical halves so the loop is seamless
  var words = ['Strength', 'Personal Training', 'Weight Loss', 'MMA', 'Zumba', 'CrossFit', 'Steam & Recovery', 'Kids Yoga'];
  var track = document.getElementById('ticker');
  if (track) {
    for (var i = 0; i < 2; i++) {
      words.forEach(function (w) {
        var s = document.createElement('span');
        s.textContent = w;
        track.appendChild(s);
      });
    }
  }

  // Mobile menu
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    if (!burger || !nav) return;
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (burger) {
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Transformation slider buttons
  var slider = document.getElementById('slider');
  function slide(dir) {
    if (!slider) return;
    var first = slider.querySelector('img');
    var step = first ? first.getBoundingClientRect().width + 16 : 320;
    slider.scrollBy({ left: dir * step, behavior: 'smooth' });
  }
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  if (prev) prev.addEventListener('click', function () { slide(-1); });
  if (next) next.addEventListener('click', function () { slide(1); });
  if (slider) {
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') slide(1);
      if (e.key === 'ArrowLeft') slide(-1);
    });
  }

  // Free trial form -> Supabase (insert only), WhatsApp as a fallback
  var form = document.getElementById('trialForm');
  var msg = document.getElementById('formMsg');
  var btn = document.getElementById('submitBtn');

  function say(text, cls, html) {
    msg.className = 'form-msg ' + (cls || '');
    if (html) msg.innerHTML = text; else msg.textContent = text;
  }

  function waLink(d) {
    var t = 'Hi Gold Fitness Kengeri, I would like a free trial.\nName: ' + d.name + '\nPhone: ' + d.phone +
      '\nGoal: ' + d.goal.replace(/_/g, ' ') + '\nPreferred time: ' + d.time;
    return WHATSAPP + '?text=' + encodeURIComponent(t);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var d = {
        name: String(fd.get('name') || '').trim(),
        phone: String(fd.get('phone') || '').replace(/[\s\-()]/g, ''),
        goal: String(fd.get('goal') || 'general_fitness'),
        time: String(fd.get('time') || 'morning')
      };
      var digits = d.phone.replace(/^\+?91/, '');
      if (d.name.length < 2) { say('Please enter your name.', 'err'); return; }
      if (!/^[6-9]\d{9}$/.test(digits)) { say('Please enter a valid 10-digit mobile number.', 'err'); return; }

      btn.disabled = true;
      say('Sending...', '');

      fetch(SUPABASE_URL + '/rest/v1/free_trial_passes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          name: d.name,
          phone: digits,
          preferred_time: d.time,
          fitness_goal: d.goal
        })
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        say('Thank you! We will call you shortly to book your free trial.', 'ok');
      }).catch(function () {
        say('We could not send that just now. <a href="' + waLink({ name: d.name, phone: digits, goal: d.goal, time: d.time }) +
          '" target="_blank" rel="noopener">Tap here to send it on WhatsApp</a> instead.', 'err', true);
      }).then(function () {
        btn.disabled = false;
      });
    });
  }
})();
