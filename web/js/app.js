/* ==========================================================================
   NÓMADA · Lógica compartida por todas las páginas
   - Cabecera, pie y carrito (se inyectan en cada página)
   - Bloque de compra: galería + variantes + añadir al carrito
   - Barra de compra fija, productos relacionados, cuadrícula de la portada
   - Efectos: reveals, foco que sigue al ratón, inclinación 3D, contadores,
     acordeón con imagen viva, puntos interactivos y texto que se escribe solo
   Todo en JS sin librerías. Cada init comprueba si su elemento existe.
   ========================================================================== */
(function () {
  if (window.__nomadaInit) return;
  window.__nomadaInit = true;

  var PRODUCTOS = window.NOMADA_PRODUCTOS || [];
  var CFG = window.NOMADA_CONFIG || {};
  var MARCA = CFG.marca || 'NÓMADA';
  var ENVIO_GRATIS = typeof CFG.envioGratisDesde === 'number' ? CFG.envioGratisDesde : 50;
  var CLAVE_CARRITO = 'nomada-carrito-v1';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- utilidades ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function euros(n) {
    return n.toLocaleString(CFG.idioma || 'es-ES', { style: 'currency', currency: CFG.moneda || 'EUR', minimumFractionDigits: n % 1 ? 2 : 0 });
  }
  function porId(id) { return PRODUCTOS.filter(function (p) { return p.id === id; })[0]; }
  function varianteDe(varId) {
    for (var i = 0; i < PRODUCTOS.length; i++) {
      for (var j = 0; j < PRODUCTOS[i].variantes.length; j++) {
        if (PRODUCTOS[i].variantes[j].id === varId) return { p: PRODUCTOS[i], v: PRODUCTOS[i].variantes[j] };
      }
    }
    return null;
  }
  function estrellas(n) {
    var s = '';
    for (var i = 1; i <= 5; i++) s += i <= Math.round(n) ? '★' : '☆';
    return s;
  }
  var ICONOS = {
    bolsa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
    cerrar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    camion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>',
    vuelta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.3-5.7"/><path d="M4 4v4h4"/></svg>',
    candado: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    escudo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };
  window.NOMADA_ICONOS = ICONOS;

  /* ---------- carrito (localStorage) ---------- */
  function leerCarrito() {
    try { return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || []; } catch (e) { return []; }
  }
  function guardarCarrito(c) {
    try { localStorage.setItem(CLAVE_CARRITO, JSON.stringify(c)); } catch (e) {}
    pintarCarrito();
  }
  function anadir(varId, cantidad) {
    var c = leerCarrito();
    var linea = c.filter(function (l) { return l.id === varId; })[0];
    if (linea) linea.cantidad += cantidad; else c.push({ id: varId, cantidad: cantidad });
    guardarCarrito(c);
  }
  function cambiarCantidad(varId, delta) {
    var c = leerCarrito().map(function (l) {
      if (l.id === varId) l.cantidad += delta;
      return l;
    }).filter(function (l) { return l.cantidad > 0; });
    guardarCarrito(c);
  }

  /* ---------- cabecera, pie, carrito y aviso ---------- */
  function initShell() {
    var pagina = document.body.getAttribute('data-pagina') || '';
    var links = PRODUCTOS.map(function (p) {
      return '<a href="' + p.url + '"' + (pagina === p.id ? ' aria-current="page"' : '') + '>' + p.nombre.split(' ')[0] + '</a>';
    }).join('');

    var anuncio = document.createElement('div');
    anuncio.className = 'anuncio';
    var anuncios = (CFG.anuncios || []).map(function (t) { return '<span>' + t + '</span>'; }).join('');
    anuncio.innerHTML = '<div class="anuncio__pista">' + anuncios + anuncios + '</div>';

    var header = document.createElement('header');
    header.className = 'cabecera';
    header.innerHTML =
      '<div class="contenedor cabecera__fila">' +
        '<button class="cabecera__menu" aria-label="Abrir menú" aria-expanded="false">' + ICONOS.menu + '</button>' +
        '<a class="logo" href="index.html" aria-label="' + MARCA + ', inicio">' + MARCA + '<span>.</span></a>' +
        '<nav class="cabecera__nav" aria-label="Productos"><a href="index.html#productos"' + (pagina === 'inicio' ? ' aria-current="page"' : '') + '>Tienda</a>' + links + '</nav>' +
        '<button class="cabecera__carrito" aria-label="Abrir carrito">' + ICONOS.bolsa + '<span class="burbuja" data-cuenta>0</span></button>' +
      '</div>';

    document.body.insertBefore(header, document.body.firstChild);
    document.body.insertBefore(anuncio, document.body.firstChild);

    var footer = document.createElement('footer');
    footer.className = 'pie';
    footer.innerHTML =
      '<div class="contenedor pie__grid">' +
        '<div><a class="logo" href="index.html">' + MARCA + '<span>.</span></a><p class="pie__txt">' + (CFG.lemaPie || '') + '</p></div>' +
        '<div><h4>Productos</h4>' + PRODUCTOS.map(function (p) { return '<a href="' + p.url + '">' + p.nombre + '</a>'; }).join('') + '</div>' +
        '<div><h4>Ayuda</h4>' + Object.keys(CFG.legales || {}).map(function (k) { return '<a href="#" data-legal="' + k + '">' + CFG.legales[k].titulo + '</a>'; }).join('') + '</div>' +
        '<div><h4>Contacto</h4>' + (CFG.contacto ? '<a href="mailto:' + CFG.contacto.email + '">' + CFG.contacto.email + '</a><p class="pie__txt">' + CFG.contacto.horario + '</p>' : '') + '</div>' +
      '</div>' +
      '<div class="contenedor pie__base"><span>© ' + new Date().getFullYear() + ' ' + MARCA + '</span><span>' + (CFG.metodosPago || '') + '</span></div>';
    document.body.appendChild(footer);

    var cajon = document.createElement('div');
    cajon.className = 'cajon';
    cajon.setAttribute('aria-hidden', 'true');
    cajon.innerHTML =
      '<div class="cajon__velo" data-cerrar-carrito></div>' +
      '<aside class="cajon__panel" role="dialog" aria-label="Tu carrito">' +
        '<div class="cajon__cab"><h3>Tu carrito</h3><button aria-label="Cerrar carrito" data-cerrar-carrito>' + ICONOS.cerrar + '</button></div>' +
        '<div class="cajon__envio" data-envio></div>' +
        '<div class="cajon__lineas" data-lineas></div>' +
        '<div class="cajon__pie"><div class="cajon__total"><span>Subtotal</span><strong data-subtotal>0 €</strong></div>' +
        '<button class="boton boton--bloque" data-pagar>Finalizar compra</button>' +
        '<p class="cajon__nota">Impuestos incluidos. Envío calculado al pagar.</p></div>' +
      '</aside>';
    document.body.appendChild(cajon);

    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);

    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = '<div class="modal__caja" role="dialog"><button class="modal__x" aria-label="Cerrar" data-cerrar-modal>' + ICONOS.cerrar + '</button><div data-modal-cuerpo></div></div>';
    document.body.appendChild(modal);

    // eventos
    $('.cabecera__carrito').addEventListener('click', abrirCarrito);
    $$('[data-cerrar-carrito]').forEach(function (b) { b.addEventListener('click', cerrarCarrito); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { cerrarCarrito(); cerrarModal(); } });
    $('.cabecera__menu').addEventListener('click', function () {
      var abierto = header.classList.toggle('menu-abierto');
      this.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    $('[data-pagar]').addEventListener('click', function () {
      if (!leerCarrito().length) return;
      if (CFG.urlPago) { window.location.href = CFG.urlPago; return; }
      abrirModal((CFG.avisoPagoDemo || '') + '<button class="boton" data-cerrar-modal>Seguir mirando</button>');
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('[data-cerrar-modal]')) cerrarModal();
    });
    $$('[data-legal]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var l = CFG.legales[a.getAttribute('data-legal')];
        abrirModal('<h3>' + l.titulo + '</h3>' + l.html + '<button class="boton" data-cerrar-modal>Entendido</button>');
      });
    });
    // cabecera con sombra al hacer scroll
    window.addEventListener('scroll', function () {
      header.classList.toggle('con-sombra', window.scrollY > 10);
    }, { passive: true });

    pintarCarrito();
  }

  function abrirCarrito() { var c = $('.cajon'); c.classList.add('abierto'); c.setAttribute('aria-hidden', 'false'); document.documentElement.classList.add('sin-scroll'); }
  function cerrarCarrito() { var c = $('.cajon'); if (!c) return; c.classList.remove('abierto'); c.setAttribute('aria-hidden', 'true'); document.documentElement.classList.remove('sin-scroll'); }
  function abrirModal(html) { var m = $('.modal'); $('[data-modal-cuerpo]', m).innerHTML = html; m.classList.add('abierto'); m.setAttribute('aria-hidden', 'false'); }
  function cerrarModal() { var m = $('.modal'); if (!m) return; m.classList.remove('abierto'); m.setAttribute('aria-hidden', 'true'); }
  function avisar(txt) {
    var t = $('.toast'); t.textContent = txt; t.classList.add('visible');
    clearTimeout(avisar._t); avisar._t = setTimeout(function () { t.classList.remove('visible'); }, 2200);
  }
  window.NOMADA_AVISAR = avisar;

  function pintarCarrito() {
    var c = leerCarrito();
    var cuenta = 0, subtotal = 0;
    var html = c.map(function (l) {
      var d = varianteDe(l.id);
      if (!d) return '';
      cuenta += l.cantidad; subtotal += d.v.precio * l.cantidad;
      return '<div class="linea" style="--l-bg:' + d.p.colores.fondo + '">' +
        '<a href="' + d.p.url + '" class="linea__img"><img src="' + d.p.imagenes[0] + '" alt="' + d.p.nombre + '"></a>' +
        '<div class="linea__info"><a href="' + d.p.url + '"><strong>' + d.p.nombre + '</strong></a><span>' + d.v.nombre + '</span>' +
        '<div class="cantidad"><button aria-label="Quitar uno" data-menos="' + l.id + '">−</button><span>' + l.cantidad + '</span><button aria-label="Añadir uno" data-mas="' + l.id + '">+</button></div></div>' +
        '<strong class="linea__precio">' + euros(d.v.precio * l.cantidad) + '</strong></div>';
    }).join('');
    $$('[data-cuenta]').forEach(function (b) { b.textContent = cuenta; b.classList.toggle('vacia', !cuenta); });
    var lineas = $('[data-lineas]');
    if (!lineas) return;
    lineas.innerHTML = html || '<div class="cajon__vacio"><p>Tu carrito está vacío.</p><a class="boton" href="index.html#productos">Ver productos</a></div>';
    $('[data-subtotal]').textContent = euros(subtotal);
    var envio = $('[data-envio]');
    if (ENVIO_GRATIS > 0) {
      var falta = ENVIO_GRATIS - subtotal;
      var pct = Math.min(100, subtotal / ENVIO_GRATIS * 100);
      envio.innerHTML = (subtotal === 0 ? 'Envío gratis a partir de ' + euros(ENVIO_GRATIS) : falta > 0 ? 'Te faltan <strong>' + euros(falta) + '</strong> para el envío gratis' : '🎉 ¡Tienes envío gratis!') +
        '<div class="barra"><i style="transform:scaleX(' + (pct / 100) + ')"></i></div>';
    } else { envio.style.display = 'none'; }
    $('[data-pagar]').disabled = !c.length;
    $$('[data-menos]', lineas).forEach(function (b) { b.addEventListener('click', function () { cambiarCantidad(b.getAttribute('data-menos'), -1); }); });
    $$('[data-mas]', lineas).forEach(function (b) { b.addEventListener('click', function () { cambiarCantidad(b.getAttribute('data-mas'), 1); }); });
  }

  /* ---------- tarjeta de producto (portada y relacionados) ---------- */
  function tarjeta(p) {
    var v = p.variantes[0];
    return '<a class="tarjeta rv" href="' + p.url + '" style="--t-bg:' + p.colores.fondo + ';--t-fg:' + p.colores.texto + ';--t-ac:' + p.colores.acento + '">' +
      '<div class="tarjeta__media"><img src="' + p.imagenes[0] + '" alt="' + p.nombre + '" loading="lazy">' +
      (p.imagenes[1] ? '<img class="tarjeta__alt" src="' + p.imagenes[1] + '" alt="" loading="lazy">' : '') +
      (v.precioAntes ? '<span class="tarjeta__chip">-' + Math.round((1 - v.precio / v.precioAntes) * 100) + '%</span>' : '') +
      '</div>' +
      '<div class="tarjeta__info"><span class="tarjeta__cat">' + p.categoria + '</span><h3>' + p.nombre + '</h3><p>' + p.resumen + '</p>' +
      '<div class="tarjeta__pie"><span class="tarjeta__precio">desde ' + euros(v.precio) + '</span><span class="tarjeta__ir">Ver ' + ICONOS.flecha + '</span></div></div></a>';
  }
  function initGrid() {
    $$('[data-grid-productos]').forEach(function (g) {
      g.innerHTML = PRODUCTOS.map(tarjeta).join('');
    });
    $$('[data-relacionados]').forEach(function (g) {
      var actual = g.getAttribute('data-relacionados');
      g.innerHTML = PRODUCTOS.filter(function (p) { return p.id !== actual; }).map(tarjeta).join('');
    });
  }

  /* ---------- bloque de compra ---------- */
  function initCompra() {
    var cont = $('[data-comprar]');
    if (!cont) return;
    var p = porId(cont.getAttribute('data-comprar'));
    if (!p) return;
    var extra = cont.innerHTML; // contenido propio de cada página (descripción, etc.)
    var sel = p.variantes.filter(function (v) { return v.disponible; })[0] || p.variantes[0];

    var galeria = '<div class="galeria">' +
      '<div class="galeria__principal"><img data-principal src="' + p.imagenes[0] + '" alt="' + p.nombre + '"></div>' +
      (p.imagenes.length > 1 ? '<div class="galeria__minis">' + p.imagenes.map(function (src, i) {
        return '<button class="' + (i === 0 ? 'activa' : '') + '" data-mini="' + src + '" aria-label="Ver foto ' + (i + 1) + '"><img src="' + src + '" alt=""></button>';
      }).join('') + '</div>' : '') + '</div>';

    var opciones = p.variantes.length > 1 ? '<fieldset class="opciones"><legend>' + p.opcionNombre + ': <strong data-opcion-nombre>' + sel.nombre + '</strong></legend><div class="opciones__lista">' +
      p.variantes.map(function (v) {
        return '<button type="button" class="opcion' + (v.id === sel.id ? ' activa' : '') + (v.disponible ? '' : ' agotada') + '" data-variante="' + v.id + '" aria-pressed="' + (v.id === sel.id) + '">' + v.nombre + (v.disponible ? '' : ' · agotado') + '</button>';
      }).join('') + '</div></fieldset>' : '';

    cont.innerHTML = galeria +
      '<div class="compra">' +
        '<span class="compra__cat">' + p.categoria + '</span>' +
        '<h1 class="compra__titulo">' + p.nombre + '</h1>' +
        '<a href="#resenas" class="compra__valoracion"><span class="estrellas">' + estrellas(p.valoracion) + '</span> ' + p.valoracion.toLocaleString('es-ES') + ' · ' + p.resenas.toLocaleString('es-ES') + ' opiniones</a>' +
        '<div class="compra__precio"><span data-precio></span><s data-antes></s><span class="compra__ahorro" data-ahorro></span></div>' +
        '<p class="compra__resumen">' + p.resumen + '</p>' +
        opciones +
        '<div class="compra__fila"><div class="cantidad cantidad--grande"><button type="button" aria-label="Quitar uno" data-q="-1">−</button><span data-q-valor>1</span><button type="button" aria-label="Añadir uno" data-q="1">+</button></div>' +
        '<button type="button" class="boton boton--bloque" data-anadir>Añadir al carrito</button></div>' +
        '<ul class="confianza">' + (CFG.confianza || []).map(function (c) { return '<li>' + (ICONOS[c.icono] || '') + c.texto + '</li>'; }).join('') + '</ul>' +
        extra +
      '</div>';

    // barra fija inferior
    var barra = document.createElement('div');
    barra.className = 'barra-compra';
    barra.innerHTML = '<div class="contenedor barra-compra__fila"><img src="' + p.imagenes[0] + '" alt=""><div><strong>' + p.nombre + '</strong><span data-barra-var></span></div><strong data-barra-precio></strong><button class="boton" data-anadir>Añadir</button></div>';
    document.body.appendChild(barra);

    var cantidad = 1;
    function actualizar() {
      $('[data-precio]', cont).textContent = euros(sel.precio);
      $('[data-antes]', cont).textContent = sel.precioAntes ? euros(sel.precioAntes) : '';
      $('[data-ahorro]', cont).textContent = sel.precioAntes ? 'Ahorras ' + euros(sel.precioAntes - sel.precio) : '';
      var n = $('[data-opcion-nombre]', cont); if (n) n.textContent = sel.nombre;
      $$('[data-variante]', cont).forEach(function (b) {
        var a = b.getAttribute('data-variante') === sel.id;
        b.classList.toggle('activa', a); b.setAttribute('aria-pressed', a);
      });
      $$('[data-anadir]').forEach(function (b) {
        b.disabled = !sel.disponible;
        b.textContent = sel.disponible ? (b.closest('.barra-compra') ? 'Añadir' : 'Añadir al carrito · ' + euros(sel.precio * cantidad)) : 'Agotado';
      });
      $('[data-barra-var]').textContent = sel.nombre;
      $('[data-barra-precio]').textContent = euros(sel.precio);
      $('[data-q-valor]', cont).textContent = cantidad;
    }
    $$('[data-variante]', cont).forEach(function (b) {
      b.addEventListener('click', function () {
        sel = p.variantes.filter(function (v) { return v.id === b.getAttribute('data-variante'); })[0];
        actualizar();
      });
    });
    $$('[data-q]', cont).forEach(function (b) {
      b.addEventListener('click', function () {
        cantidad = Math.max(1, Math.min(9, cantidad + parseInt(b.getAttribute('data-q'), 10)));
        actualizar();
      });
    });
    $$('[data-anadir]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (!sel.disponible) return;
        anadir(sel.id, cantidad);
        avisar('✓ ' + p.nombre + ' añadido al carrito');
        setTimeout(abrirCarrito, 350);
      });
    });
    // galería
    var principal = $('[data-principal]', cont);
    $$('[data-mini]', cont).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-mini]', cont).forEach(function (x) { x.classList.remove('activa'); });
        b.classList.add('activa');
        principal.classList.add('cambiando');
        setTimeout(function () { principal.src = b.getAttribute('data-mini'); principal.classList.remove('cambiando'); }, 180);
      });
    });
    // mostrar barra fija cuando el botón principal sale de pantalla
    var boton = $('[data-anadir]', cont);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        var fuera = !e[0].isIntersecting && e[0].boundingClientRect.top < 0;
        barra.classList.toggle('visible', fuera);
      }).observe(boton);
    }
    actualizar();

    // botones "comprar" repartidos por la página → suben al bloque de compra
    $$('[data-ir-compra]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        cont.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  /* ---------- efectos ---------- */
  function initReveals() {
    var els = $$('.rv');
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('visible'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (e, i) {
      if (!e.style.getPropertyValue('--rv-delay')) {
        var hermanos = Array.prototype.indexOf.call(e.parentNode.children, e);
        e.style.setProperty('--rv-delay', Math.min(hermanos, 5) * 80 + 'ms');
      }
      io.observe(e);
    });
  }
  function initSpotlight() {
    $$('[data-spotlight]').forEach(function (el) {
      var tx = 50, ty = 45, x = 50, y = 45, raf;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width * 100; ty = (e.clientY - r.top) / r.height * 100;
        if (!raf) raf = requestAnimationFrame(paso);
      });
      function paso() {
        x += (tx - x) * 0.12; y += (ty - y) * 0.12;
        el.style.setProperty('--mx', x + '%'); el.style.setProperty('--my', y + '%');
        raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.2 ? requestAnimationFrame(paso) : null;
      }
    });
  }
  function initTilt() {
    if (reduceMotion || window.matchMedia('(hover: none)').matches) return;
    $$('[data-tilt]').forEach(function (el) {
      var max = parseFloat(el.getAttribute('data-tilt')) || 8;
      var zona = el.closest('[data-tilt-zona]') || el;
      zona.addEventListener('pointermove', function (e) {
        var r = zona.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(900px) rotateY(' + (px * max * 2) + 'deg) rotateX(' + (-py * max * 2) + 'deg)';
        el.style.setProperty('--gx', (px + 0.5) * 100 + '%'); el.style.setProperty('--gy', (py + 0.5) * 100 + '%');
      });
      zona.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }
  function initContadores() {
    var els = $$('[data-count]');
    if (!els.length) return;
    function animar(el) {
      var fin = parseFloat(el.getAttribute('data-count'));
      var dec = (el.getAttribute('data-count').split('.')[1] || '').length;
      if (reduceMotion) { el.textContent = fin.toLocaleString('es-ES', { minimumFractionDigits: dec }); return; }
      var t0 = null;
      function paso(t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / 1400);
        var v = fin * (1 - Math.pow(1 - k, 3));
        el.textContent = v.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });
        if (k < 1) requestAnimationFrame(paso);
      }
      requestAnimationFrame(paso);
    }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { animar(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    els.forEach(function (e) { io.observe(e); });
  }
  function initAcordeonVivo() {
    $$('[data-acordeon]').forEach(function (ac) {
      var img = $('[data-acordeon-img]', ac);
      var items = $$('[data-acordeon-item]', ac);
      items.forEach(function (it) {
        $('button', it).addEventListener('click', function () {
          items.forEach(function (o) { o.classList.remove('abierto'); $('button', o).setAttribute('aria-expanded', 'false'); });
          it.classList.add('abierto'); $('button', it).setAttribute('aria-expanded', 'true');
          var src = it.getAttribute('data-img');
          if (img && src && img.getAttribute('src') !== src) {
            img.classList.add('cambiando');
            setTimeout(function () { img.src = src; img.classList.remove('cambiando'); }, 250);
          }
        });
      });
    });
  }
  function initHotspots() {
    $$('.punto').forEach(function (p) {
      p.addEventListener('click', function (e) {
        e.stopPropagation();
        var abierto = p.classList.contains('abierto');
        $$('.punto').forEach(function (o) { o.classList.remove('abierto'); o.setAttribute('aria-expanded', 'false'); });
        if (!abierto) { p.classList.add('abierto'); p.setAttribute('aria-expanded', 'true'); }
      });
    });
    document.addEventListener('click', function () { $$('.punto').forEach(function (o) { o.classList.remove('abierto'); }); });
  }
  function initTypewriter() {
    $$('[data-typewriter]').forEach(function (el) {
      var frases = el.getAttribute('data-typewriter').split('|');
      if (reduceMotion) { el.textContent = frases[0]; return; }
      var i = 0, j = 0, borrando = false;
      function paso() {
        var f = frases[i];
        el.textContent = f.slice(0, j);
        if (!borrando && j < f.length) { j++; setTimeout(paso, 70); }
        else if (!borrando) { borrando = true; setTimeout(paso, 1600); }
        else if (j > 0) { j--; setTimeout(paso, 35); }
        else { borrando = false; i = (i + 1) % frases.length; setTimeout(paso, 300); }
      }
      paso();
    });
  }
  function initNewsletter() {
    $$('[data-newsletter]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        avisar('✓ ¡Apuntado! Revisa tu correo para tu 10 %');
        f.reset();
      });
    });
  }
  function initParallax() {
    var els = $$('[data-parallax]');
    if (!els.length || reduceMotion) return;
    var tick = false;
    function pintar() {
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var k = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        var centro = r.top + r.height / 2 - window.innerHeight / 2;
        el.style.transform = 'translate3d(0,' + (-centro * k).toFixed(1) + 'px,0)';
      });
      tick = false;
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(pintar); } }, { passive: true });
    pintar();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initShell();
    initGrid();
    initCompra();
    initReveals();
    initSpotlight();
    initTilt();
    initContadores();
    initAcordeonVivo();
    initHotspots();
    initTypewriter();
    initNewsletter();
    initParallax();
  });
})();
