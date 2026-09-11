/* hero */
(function(){
  const root = document.getElementById('hero');
  if (!root) return;

  (function(){
    const b = root.querySelector('burger');
    const n = document.querySelector('#hero nav') || document.querySelector('nav');
    if (!b || !n) return;
    b.addEventListener('click', () => {
      b.classList.toggle('open');
      n.classList.toggle('open');
    });
    n.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      b.classList.remove('open'); n.classList.remove('open');
    }));
  })();


  (function(){
    const stage = root.querySelectorAll('.portrait-stage')[0];
    if (!stage) return;
    const img = stage.querySelector('.portrait-img');
    const go  = () => stage.classList.add('ready');
    // wait for the photo itself — otherwise the animation finishes before it arrives
    if (img.complete && img.naturalWidth) go();
    else { img.addEventListener('load', go); img.addEventListener('error', go); }
    setTimeout(go, 3000);   // safety net
  })();

})();
/* pain */
(function(){
  const root = document.getElementById('pain');
  if (!root) return;

  const rows = Array.from(root.querySelectorAll('[data-row]'));

  // A narrow trigger band across the middle of the screen: a row only fires when it
  // scrolls into that band, so the three pairs can never all start together —
  // even when the whole section fits on screen at a reduced zoom level.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const row = entry.target;
      observer.unobserve(row);

      row.classList.add('problem-in');                                  // dark circle now
      setTimeout(() => row.classList.add('solution-in'), 2000);         // green 2s later
    });
  }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });

  rows.forEach(row => observer.observe(row));

})();
/* whyme */
(function(){
  const root = document.getElementById('whyme');
  if (!root) return;

  (function(){
    const hosts = root.querySelectorAll('.section');
    if (!hosts.length) return;
    let ticking = false, mx = 0, my = 0;

    window.addEventListener('mousemove', (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5);
      my = (e.clientY / window.innerHeight - 0.5);
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        hosts.forEach(el => {
          el.style.setProperty('--px', (-mx * 34).toFixed(1) + 'px');
          el.style.setProperty('--py', (-my * 26).toFixed(1) + 'px');
        });
        ticking = false;
      });
    }, { passive: true });
  })();

})();
/* services */
(function(){
  const root = document.getElementById('services');
  if (!root) return;

  const canvas = root.querySelectorAll('.canvas')[0];
  const BASE_H = 420;

  function resizeCanvas() {
    let lowest = BASE_H;
    root.querySelectorAll('.card').forEach(c => {
      lowest = Math.max(lowest, c.offsetTop + c.offsetHeight);
    });
    canvas.style.height = Math.max(BASE_H, lowest + 30) + 'px';
  }

  root.querySelectorAll('.discover-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      const extra = card.querySelector('.extra');

      if (card.classList.contains('open')) {
        card.classList.remove('open');
        card.style.height = '360px';
      } else {
        root.querySelectorAll('.card.open').forEach(o => {
          o.classList.remove('open');
          o.style.height = '360px';
        });
        card.classList.add('open');
        card.style.height = (344 + extra.scrollHeight + 40) + 'px';
      }
      setTimeout(resizeCanvas, 0);
      setTimeout(resizeCanvas, 400);
    });
  });

})();
/* steps */
(function(){
  const root = document.getElementById('steps');
  if (!root) return;

  const steps = root.querySelectorAll('[data-step]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  steps.forEach(s => io.observe(s));


  (function(){
    const hosts = root.querySelectorAll('.section');
    if (!hosts.length) return;
    let ticking = false, mx = 0, my = 0;

    window.addEventListener('mousemove', (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5);
      my = (e.clientY / window.innerHeight - 0.5);
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        hosts.forEach(el => {
          el.style.setProperty('--px', (-mx * 34).toFixed(1) + 'px');
          el.style.setProperty('--py', (-my * 26).toFixed(1) + 'px');
        });
        ticking = false;
      });
    }, { passive: true });
  })();

})();
/* faq */
(function(){
  const root = document.getElementById('faq');
  if (!root) return;

  const canvas = root.querySelectorAll('.canvas')[0];
  const BASE_H = 620;
  const items  = Array.from(root.querySelectorAll('.faq-item'));

  function resizeCanvas() {
    const col = root.querySelectorAll('.faq-col')[0];
    canvas.style.minHeight = Math.max(BASE_H, col.offsetHeight + 10) + 'px';
  }

  items.forEach(item => {
    const head = item.querySelector('.faq-head');
    const body = item.querySelector('.faq-body');
    head.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      items.forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-body').style.maxHeight = '0px';
      });
      if (!wasOpen) {
        item.classList.add('open');
        body.style.maxHeight = (body.scrollHeight + 28) + 'px';
      }
      setTimeout(resizeCanvas, 0);
      setTimeout(resizeCanvas, 450);
    });
  });

  // staggered reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const i = items.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('revealed'), i * 100);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  items.forEach(item => io.observe(item));

})();
/* footer */
(function(){
  const root = document.getElementById('footer');
  if (!root) return;

  (function(){
    const hosts = root.querySelectorAll('footer');
    if (!hosts.length) return;
    let ticking = false, mx = 0, my = 0;

    window.addEventListener('mousemove', (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5);
      my = (e.clientY / window.innerHeight - 0.5);
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        hosts.forEach(el => {
          el.style.setProperty('--px', (-mx * 34).toFixed(1) + 'px');
          el.style.setProperty('--py', (-my * 26).toFixed(1) + 'px');
        });
        ticking = false;
      });
    }, { passive: true });
  })();

})();

/* mobile layer */
(function(){
  const frame  = document.querySelector('#mobile .m-frame');
  const scaler = document.querySelector('#mobile .m-scaler');
  if (!frame || !scaler) return;
  const FRAME_H = 8708;

  // the hero animation must wait for the photo, otherwise it plays before the file arrives
  const stage = frame.querySelector('.m-stage');
  if (stage) {
    const pic = stage.querySelector('.m-portrait');
    const go  = () => stage.classList.add('ready');
    if (pic && pic.complete && pic.naturalWidth) go();
    else if (pic) { pic.addEventListener('load', go); pic.addEventListener('error', go); }
    else go();
    setTimeout(go, 3000);   // safety net: never leave it invisible
  }

  function fit(){
    const k = (scaler.clientWidth || window.innerWidth) / 320;
    frame.style.transform = 'scale(' + k + ')';
    scaler.style.height = (FRAME_H * k) + 'px';
  }
  fit(); window.addEventListener('resize', fit);

  const b = document.getElementById('m-burger'), n = document.getElementById('m-nav');
  if (b && n) {
    const open  = () => { b.classList.add('open');    n.classList.add('open'); };
    const close = () => { b.classList.remove('open'); n.classList.remove('open'); };
    b.addEventListener('click', e => { e.stopPropagation();
      n.classList.contains('open') ? close() : open(); });
    b.addEventListener('mouseenter', open);
    n.addEventListener('mouseenter', open);
    n.addEventListener('mouseleave', close);
    n.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }

  const ro = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    ro.unobserve(e.target);
    e.target.classList.add('p-in');
    setTimeout(() => e.target.classList.add('s-in'), 2000);
  }), { threshold: 0, rootMargin: '-45% 0px -45% 0px' });
  frame.querySelectorAll('[data-mrow]').forEach(r => ro.observe(r));

  frame.querySelectorAll('[data-mcard]').forEach(card => {
    const btn = card.querySelector('.m-sbtn'), extra = card.querySelector('.m-sextra');
    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      if (isOpen) {
        extra.style.maxHeight = '0px';
        card.style.height = '242px';
        card.classList.remove('open');
        return;
      }
      // close any other open card first
      frame.querySelectorAll('[data-mcard].open').forEach(o => {
        o.classList.remove('open');
        o.style.height = '242px';
        o.querySelector('.m-sextra').style.maxHeight = '0px';
      });
      card.classList.add('open');
      extra.style.maxHeight = 'none';          // let it take its natural size
      const full = card.scrollHeight;          // real height of all the content
      extra.style.maxHeight = extra.scrollHeight + 'px';
      card.style.height = full + 'px';
    });
  });

  /* FAQ — heights measured once, up front, so opening never re-measures */
  const items = Array.from(frame.querySelectorAll('[data-mfaq]'));
  const FAQ_TOP = parseInt(items[0].style.top, 10);
  const GAP = 14;

  // blocks that sit under the FAQ column and must follow it
  const below = Array.from(frame.querySelectorAll('.m-ch2, .m-csub, .m-field, .m-cbtn, .m-cpriv'));
  below.forEach(el => { if (!el.dataset.baseTop) el.dataset.baseTop = parseInt(el.style.top, 10); });
  const FAQ_BOTTOM_BASE = FAQ_TOP + items.reduce((s, it) => s + parseInt(it.dataset.base, 10) + GAP, 0);

  function measure(){
    let y = FAQ_TOP;
    items.forEach(it => {
      const a = it.querySelector('.m-fa');
      const q = it.querySelector('.m-fq');

      // natural closed height: the question plus its padding, never less than the design height
      const closed = Math.max(parseInt(it.dataset.base, 10), q.offsetHeight + 30);
      it.dataset.closedH = closed;

      const aTop = 14 + q.offsetHeight + 10;
      a.style.top = aTop + 'px';
      it.dataset.openH = (aTop + a.offsetHeight + 16);

      it.style.top = y + 'px';
      it.style.height = (it.classList.contains('open') ? it.dataset.openH : closed) + 'px';
      y += closed + GAP;
    });

    // shift the contact block by however much the questions grew
    const delta = y - FAQ_BOTTOM_BASE;
    below.forEach(el => { el.style.top = (parseInt(el.dataset.baseTop, 10) + delta) + 'px'; });
  }
  measure();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  window.addEventListener('load', measure);
  items.forEach(it => it.addEventListener('click', () => {
    const wasOpen = it.classList.contains('open');
    items.forEach(o => { o.classList.remove('open'); o.style.height = (o.dataset.closedH || o.dataset.base) + 'px'; });
    if (wasOpen) return;

    it.classList.add('open');
    const a = it.querySelector('.m-fa');
    const q = it.querySelector('.m-fq');
    // measure now, with the plate already open, so the answer is never cut off
    const aTop = 14 + q.offsetHeight + 10;
    a.style.top = aTop + 'px';
    it.style.height = (aTop + a.scrollHeight + 18) + 'px';
  }));
})();


/* ---- privacy policy modal ---- */
(function(){
  const ov = document.getElementById('privacy-overlay');
  if (!ov) return;
  const open  = e => { if (e) e.preventDefault(); ov.classList.add('open');    document.body.style.overflow = 'hidden'; };
  const close = () => { ov.classList.remove('open'); document.body.style.overflow = ''; };

  document.querySelectorAll('.privacy, .m-fpriv, .privacy-note, [data-privacy]')
    .forEach(el => el.addEventListener('click', open));
  document.getElementById('privacy-close').addEventListener('click', close);
  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();


/* ---- project brief: separate Google Form ---- */
(function(){
  const ov = document.querySelector('#brief .brief-overlay');
  if (!ov) return;

  const ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSc-QlQMAXJpGvQYD0M-4F_HeE-NIJB2JTqLl2eGrRE6YyWEfA/formResponse';
  const F = {
    name:     'entry.320073902',
    contact:  'entry.2112195389',
    services: 'entry.924704674',
    about:    'entry.1834882562',
    timeline: 'entry.1910473213'
  };

  const form    = document.querySelector('#brief #brief-form');
  const closeB  = document.querySelector('#brief #brief-close');
  const success = document.querySelector('#brief #brief-success');
  const errBox  = document.querySelector('#brief #brief-error');
  const q = id => document.querySelector('#brief #' + id);

  function open(e)  { if (e) e.preventDefault();
                       ov.classList.add('open');
                       document.body.style.overflow = 'hidden'; }
  function close()  { ov.classList.remove('open'); document.body.style.overflow = ''; }

  document.querySelectorAll('[data-open-brief]').forEach(el => el.addEventListener('click', open));
  closeB.addEventListener('click', close);
  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && ov.classList.contains('open')) close();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = q('b-name').value.trim();
    const contact = q('b-contact').value.trim();
    const about   = q('b-about').value.trim();
    const tRadio  = document.querySelector('#brief #b-timeline input:checked');
    const timeline= tRadio ? tRadio.value : '';
    const services = Array.from(document.querySelectorAll('#brief #b-services input:checked'))
                          .map(i => i.value);

    // the form marks these as required, so a blank answer would be rejected silently
    if (!name || !contact || !about || services.length === 0) {
      errBox.textContent = 'Please fill in your name, contact, at least one service and a few words about the project.';
      errBox.classList.add('show');
      return;
    }
    errBox.classList.remove('show');

    const btn = form.querySelector('.brief-submit');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    const fd = new FormData();
    fd.append(F.name, name);
    fd.append(F.contact, contact);
    services.forEach(v => fd.append(F.services, v));   // checkbox: one line per choice
    fd.append(F.about, about);
    if (timeline) fd.append(F.timeline, timeline);

    fetch(ACTION, { method: 'POST', mode: 'no-cors', body: fd }).finally(() => {
      btn.disabled = false;
      btn.textContent = 'Send brief';
      success.classList.add('show');
      form.reset();
    });
  });
})();


/* contact popup wiring */
(function(){
  const overlay = document.querySelector('#popup .overlay');
  if (!overlay) return;
  const form    = document.querySelector('#popup #popup-form');
  const success = document.querySelector('#popup #popup-success');
  const closeBtn= document.querySelector('#popup #popup-close');

  function open(e)  { if (e) e.preventDefault();
                       overlay.classList.add('open');
                       document.body.style.overflow = 'hidden'; }
  function close()  { overlay.classList.remove('open');
                       document.body.style.overflow = ''; }

  document.querySelectorAll('[data-open-popup]').forEach(el => el.addEventListener('click', open));
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    const data = {
      name:  form.querySelector('#p-name').value.trim(),
      phone: form.querySelector('#p-phone').value.trim(),
      email: form.querySelector('#p-contact').value.trim()
    };
    btn.disabled = true;
    btn.textContent = 'Sending...';
    window.sendEnquiry(data).finally(() => {
      btn.disabled = false;
      btn.textContent = 'Contact me';
      success.classList.add('show');
      form.reset();
    });
  });
})();

/* ---- enquiry delivery: Google Forms ---- */
(function(){
  const ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSeMz_tJXEBdf032-ULUAB3cuiGD2wNWdzNciN06MT0Srk163Q/formResponse';
  const F = { name: 'entry.1243884185', phone: 'entry.2052821936', email: 'entry.2081438238' };

  window.sendEnquiry = function(data) {
    const fd = new FormData();
    fd.append(F.name,  data.name  || '');
    fd.append(F.phone, data.phone || '');
    fd.append(F.email, data.email || '');
    // no-cors: Google accepts the POST but the reply can't be read back
    return fetch(ACTION, { method: 'POST', mode: 'no-cors', body: fd });
  };
})();

/* ---- contact form in the FAQ section ---- */
(function(){
  const btn = document.getElementById('c-submit');
  if (!btn) return;
  const msg = document.getElementById('c-msg');
  const get = id => document.getElementById(id);

  btn.addEventListener('click', () => {
    const data = {
      name:  get('c-name').value.trim(),
      phone: get('c-phone').value.trim(),
      email: get('c-email').value.trim()
    };
    if (!data.name || (!data.phone && !data.email)) {
      msg.textContent = 'Please add your name and a phone number or email.';
      msg.classList.add('show', 'err');
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Sending...';
    window.sendEnquiry(data).finally(() => {
      btn.disabled = false;
      btn.textContent = 'Contact me';
      msg.textContent = "Thanks! I'll get back to you shortly.";
      msg.classList.remove('err');
      msg.classList.add('show');
      get('c-name').value = get('c-phone').value = get('c-email').value = '';
    });
  });
})();

/* ---- contact form on mobile ---- */
(function(){
  const frame = document.querySelector('#mobile .m-frame');
  if (!frame) return;
  const btn = frame.querySelector('.m-cbtn');
  const inputs = frame.querySelectorAll('.m-field input');
  if (!btn || inputs.length < 3) return;

  btn.addEventListener('click', () => {
    const data = { name: inputs[0].value.trim(), phone: inputs[1].value.trim(), email: inputs[2].value.trim() };
    if (!data.name || (!data.phone && !data.email)) {
      btn.textContent = 'Add name + contact';
      setTimeout(() => btn.textContent = 'Contact me', 2200);
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Sending...';
    window.sendEnquiry(data).finally(() => {
      btn.disabled = false;
      btn.textContent = 'Thanks! I will reply soon';
      inputs.forEach(i => i.value = '');
      setTimeout(() => btn.textContent = 'Contact me', 4000);
    });
  });
})();
