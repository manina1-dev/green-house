(function () {
  const H = window.HOUSE || {};
  const photos = H.photos || [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  // Airbnb serves only fixed widths (720, 960, 1200, 1440, 1920)
  const sized = (src, w) => /muscache\.com/.test(src) ? src + "?im_w=" + w : src;

  // ---------- English translations (Greek is the text in index.html) ----------
  const EN = {
    "nav.about": "The house", "nav.spaces": "Spaces", "nav.gallery": "Photos", "nav.location": "Location", "nav.contact": "Contact",
    "cta.book": "Book", "cta.book.direct": "Book & contact", "cta.airbnb": "Book on Airbnb", "cta.call": "Phone",
    "hero.eyebrow": "Schinias · Attica", "hero.title": "A house in the green, minutes from the sea",
    "about.eyebrow": "The house", "about.title": "Calm, nature and the sea",
    "about.p1": "A peaceful detached house surrounded by greenery, just a few minutes from Schinias beach.",
    "about.p2": "Two comfortable bedrooms, a bright living room, a fully equipped kitchen and a private garden for morning coffee and dinners under the stars.",
    "about.p3": "Ideal for families or friends looking for calm, nature and the sea in one of the most beautiful spots in Attica.",
    "about.pets": "🐾 Pet friendly – pets are welcome!",
    "stat.guests": "guests", "stat.bedrooms": "bedrooms", "stat.beds": "beds", "stat.baths": "baths",
    "spaces.eyebrow": "Spaces", "spaces.title": "The whole house, just for you",
    "sp.living.t": "Living room & kitchen", "sp.living.1": "Bright living room with TV", "sp.living.2": "2 sofa beds",
    "sp.living.3": "Fully equipped kitchen with oven and microwave", "sp.living.4": "Coffee maker, kettle, wine glasses",
    "sp.bed.t": "Bedrooms & bathrooms", "sp.bed.1": "Bedroom 1 with a queen bed", "sp.bed.2": "Bedroom 2 with two single beds",
    "sp.bed.3": "Bathroom with bathtub, plus a half bathroom", "sp.bed.4": "Bed linen, towels and air conditioning",
    "sp.garden.t": "Garden & balcony", "sp.garden.1": "Private garden", "sp.garden.2": "Outdoor dining area", "sp.garden.3": "Balcony", "sp.garden.4": "Free parking on the premises",
    "am.eyebrow": "Amenities", "am.title": "Everything you need",
    "am.wifi": "Wifi", "am.ac": "Air conditioning", "am.heat": "Heating", "am.tv": "TV", "am.washer": "Washing machine",
    "am.kitchen": "Kitchen", "am.fridge": "Fridge & freezer", "am.oven": "Oven & microwave", "am.coffee": "Coffee maker & kettle",
    "am.iron": "Iron & hangers", "am.bath": "Bathtub & hot water", "am.linen": "Bed linen & towels", "am.outdoor": "Outdoor dining area",
    "am.parking": "Free parking", "am.safety": "Fire extinguisher, first aid kit, smoke & CO alarms",
    "gallery.eyebrow": "Photos", "gallery.title": "A look inside Green House",
    "loc.eyebrow": "Location", "loc.title": "Schinias, Attica",
    "loc.p1": "The house sits in a quiet area of Schinias, a few minutes from one of the longest sandy beaches in Attica, with pine trees down to the water and shallow sea for children.",
    "near.1": "Schinias beach", "near.2": "Schinias – Marathon National Park", "near.3": "Olympic Rowing Centre", "near.4": "Marathon, Rhamnous and Athens",
    "loc.address": "Kronou 20, Schinias, 190 07 Attica", "loc.directions": "Directions",
    "rules.eyebrow": "Good to know", "rules.title": "Before you arrive",
    "rules.1": "Up to 6 guests", "rules.3": "Pets allowed",
    "rules.4": "No smoking (including e-cigarettes)", "rules.5": "No parties or events", "rules.6": "Exterior security camera on the property",
    "contact.eyebrow": "Book & contact", "contact.title": "Come and stay at Green House",
    "contact.lead": "To book or ask anything, contact us directly. If you prefer, you can also book through Airbnb.",
    "footer.ama": "Property Reg. No.",
    "around.eyebrow": "Around the house", "around.title": "Sea, nature and history",
    "around.lead": "Schinias is a perfect base for relaxing by the sea, and for day trips around north-east Attica.",
    "around.1.t": "Schinias beach", "around.1.d": "One of the longest sandy beaches in Attica, with pine trees down to the water and shallow, clear sea – great for children, windsurfing and kitesurfing.",
    "around.2.t": "Schinias – Marathon National Park", "around.2.d": "Pine forest and wetland full of plants and birds. Lovely routes for walking, running and cycling.",
    "around.3.t": "Olympic Rowing Centre", "around.3.d": "The 2004 Olympic Games venue – for a morning walk or run by the water, and to watch the rowers train.",
    "around.4.t": "Marathon & Rhamnous", "around.4.d": "The Tomb of Marathon, the Marathon Run Museum and the archaeological site of Rhamnous, all a short drive away.",
    "around.5.t": "Fish tavernas by the sea", "around.5.d": "Fresh fish and meze with a sea view, in Schinias and the seaside villages nearby.",
    "around.6.t": "A day in Athens", "around.6.d": "The Acropolis, Plaka and the museums of Athens make an easy day trip, about an hour by car.",
    "nav.availability": "Availability",
    "cal.eyebrow": "Availability", "cal.title": "When the house is free",
    "cal.lead": "This calendar updates automatically. Found free dates? Send us a message and we'll book them for you, or book on Airbnb.",
    "cal.free": "Available", "cal.booked": "Booked", "cal.book": "Ask about your dates",
  };

  // ---------- language ----------
  const EL = {};
  $$("[data-i18n]").forEach(el => { EL[el.dataset.i18n] = el.textContent; });
  let lang = "el";
  try { lang = localStorage.getItem("gh-lang") || (navigator.language.startsWith("el") ? "el" : "en"); } catch (e) {}
  function setLang(l) {
    lang = l;
    const dict = l === "en" ? EN : EL;
    $$("[data-i18n]").forEach(el => { const t = dict[el.dataset.i18n]; if (t) el.textContent = t; });
    document.documentElement.lang = l;
    $("#langToggle").textContent = l === "en" ? "EL" : "EN";
    try { localStorage.setItem("gh-lang", l); } catch (e) {}
    buildGallery();
    renderCalendar();
  }
  $("#langToggle").addEventListener("click", () => setLang(lang === "en" ? "el" : "en"));

  // ---------- photos ----------
  // data-photo="garden-01" → the photo images/garden-01.jpg (caption from config when listed there)
  const byName = n => photos.find(p => p.src.endsWith("/" + n + ".jpg")) || { src: "images/" + n + ".jpg", el: "" };
  $$("[data-photo]").forEach(img => {
    const p = byName(img.dataset.photo);
    img.src = sized(p.src, 1200); img.alt = p.el;
  });
  $$("[data-photo-bg]").forEach(el => {
    el.style.backgroundImage = `url('${sized(byName(el.dataset.photoBg).src, 1920)}')`;
  });

  function buildGallery() {
    const grid = $("#galleryGrid"); grid.innerHTML = "";
    photos.forEach((p, i) => {
      const b = document.createElement("button"); b.type = "button";
      const img = document.createElement("img"); img.src = sized(p.src, 960); img.alt = p[lang] || p.el; img.loading = "lazy";
      b.appendChild(img); b.addEventListener("click", () => openLb(i)); grid.appendChild(b);
    });
  }

  // ---------- lightbox ----------
  const lb = $("#lightbox"); let cur = 0;
  function show(i) {
    cur = (i + photos.length) % photos.length;
    const p = photos[cur]; $("img", lb).src = sized(p.src, 1440); $("figcaption", lb).textContent = p[lang] || p.el;
  }
  function openLb(i) { show(i); lb.hidden = false; }
  $(".lb-close", lb).onclick = () => (lb.hidden = true);
  $(".lb-prev", lb).onclick = () => show(cur - 1);
  $(".lb-next", lb).onclick = () => show(cur + 1);
  lb.addEventListener("click", e => { if (e.target === lb) lb.hidden = true; });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") lb.hidden = true;
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });

  // ---------- contact links (hidden when empty in config) ----------
  const link = (sel, href) => $$(sel).forEach(a => { if (href) a.href = href; else a.remove(); });
  link(".airbnb-link", H.airbnbUrl);
  link(".contact-whatsapp", H.whatsapp && "https://wa.me/" + H.whatsapp);
  link(".contact-email", H.email && "mailto:" + H.email);
  link(".contact-phone", H.phone && "tel:" + H.phone.replace(/\s/g, ""));

  // ---------- availability calendar (data/availability.json, synced from Airbnb) ----------
  const calMonths = $("#calMonths"), calPrev = $("#calPrev"), calNext = $("#calNext"), calUpdated = $("#calUpdated");
  const MAX_AHEAD = 12; // months shown ahead
  let booked = [], updatedAt = null, offset = 0;
  const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const isBooked = k => booked.some(([s, e]) => k >= s && k < e); // nights: the check-out day stays free
  const perView = () => (matchMedia("(max-width: 900px)").matches ? 1 : 2);
  function renderCalendar() {
    if (!calMonths) return;
    const loc = lang === "en" ? "en-GB" : "el-GR";
    const now = new Date(), todayKey = iso(now), n = perView();
    offset = Math.max(0, Math.min(offset, MAX_AHEAD - n));
    calPrev.disabled = offset === 0; calNext.disabled = offset >= MAX_AHEAD - n;
    const dows = [];
    for (let i = 0; i < 7; i++) dows.push(new Date(2024, 0, 1 + i).toLocaleDateString(loc, { weekday: "short" })); // Mon..Sun
    calMonths.innerHTML = "";
    for (let m = 0; m < n; m++) {
      const first = new Date(now.getFullYear(), now.getMonth() + offset + m, 1);
      const box = document.createElement("div"); box.className = "cal-month";
      const h = document.createElement("h3");
      h.textContent = first.toLocaleDateString(loc, { month: "long", year: "numeric" });
      const grid = document.createElement("div"); grid.className = "cal-grid";
      dows.forEach(w => { const c = document.createElement("div"); c.className = "dow"; c.textContent = w.replace(".", ""); grid.appendChild(c); });
      for (let i = 0; i < (first.getDay() + 6) % 7; i++) grid.appendChild(document.createElement("div"));
      const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
      for (let d = 1; d <= days; d++) {
        const k = iso(new Date(first.getFullYear(), first.getMonth(), d));
        const c = document.createElement("div"); c.className = "d"; c.textContent = d;
        if (k < todayKey) c.classList.add("past");
        else if (isBooked(k)) { c.classList.add("booked"); c.title = lang === "en" ? "Booked" : "Κλεισμένο"; }
        if (k === todayKey) c.classList.add("today");
        grid.appendChild(c);
      }
      box.append(h, grid); calMonths.appendChild(box);
    }
    calUpdated.textContent = updatedAt
      ? (lang === "en" ? "Last updated: " : "Τελευταία ενημέρωση: ") +
        updatedAt.toLocaleString(loc, { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })
      : "";
  }
  if (calMonths) {
    calPrev.addEventListener("click", () => { offset -= perView(); renderCalendar(); });
    calNext.addEventListener("click", () => { offset += perView(); renderCalendar(); });
    matchMedia("(max-width: 900px)").addEventListener("change", renderCalendar);
    fetch("data/availability.json?t=" + Date.now(), { cache: "no-store" })
      .then(r => (r.ok ? r.json() : null))
      .then(j => {
        if (!j) return;
        booked = Array.isArray(j.booked) ? j.booked : [];
        updatedAt = j.updated ? new Date(j.updated) : null;
        renderCalendar();
      })
      .catch(() => {});
  }

  // ---------- menu ----------
  const menu = $("#menu");
  $("#menuOpen").onclick = () => (menu.hidden = false);
  $("#menuClose").onclick = () => (menu.hidden = true);
  $$("a", menu).forEach(a => a.addEventListener("click", () => (menu.hidden = true)));

  // ---------- nav on scroll ----------
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 60);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // ---------- reveal ----------
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
    $$(".reveal").forEach(el => io.observe(el));
  } else $$(".reveal").forEach(el => el.classList.add("in"));

  if (H.ama) $(".ama-num").textContent = H.ama; else $(".ama-wrap").remove();
  $("#year").textContent = new Date().getFullYear();
  setLang(lang);
})();
