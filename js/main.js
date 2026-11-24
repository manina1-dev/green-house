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
    "about.p2": "Two comfortable bedrooms, a bright living room with fireplace, a fully equipped kitchen and a private garden for morning coffee and dinners under the stars.",
    "about.p3": "Ideal for families or friends looking for calm, nature and the sea in one of the most beautiful spots in Attica.",
    "about.pets": "🐾 Pet friendly – pets are welcome!",
    "stat.guests": "guests", "stat.bedrooms": "bedrooms", "stat.beds": "beds", "stat.baths": "baths",
    "spaces.eyebrow": "Spaces", "spaces.title": "The whole house, just for you",
    "sp.living.t": "Living room & kitchen", "sp.living.1": "Bright living room with fireplace and TV", "sp.living.2": "2 sofa beds",
    "sp.living.3": "Fully equipped kitchen with oven and microwave", "sp.living.4": "Coffee maker, kettle, wine glasses",
    "sp.bed.t": "Bedrooms & bathrooms", "sp.bed.1": "Bedroom 1 with a queen bed", "sp.bed.2": "Bedroom 2 with two single beds",
    "sp.bed.3": "Bathroom with bathtub, plus a half bathroom", "sp.bed.4": "Bed linen, towels and air conditioning",
    "sp.garden.t": "Garden & balcony", "sp.garden.1": "Private garden", "sp.garden.2": "Outdoor dining area", "sp.garden.3": "Balcony", "sp.garden.4": "Free parking on the premises",
    "am.eyebrow": "Amenities", "am.title": "Everything you need",
    "am.wifi": "Wifi", "am.ac": "Air conditioning", "am.heat": "Heating", "am.fire": "Fireplace", "am.tv": "TV", "am.washer": "Washing machine",
    "am.kitchen": "Kitchen", "am.fridge": "Fridge & freezer", "am.oven": "Oven & microwave", "am.coffee": "Coffee maker & kettle",
    "am.iron": "Iron & hangers", "am.bath": "Bathtub & hot water", "am.linen": "Bed linen & towels", "am.outdoor": "Outdoor dining area",
    "am.parking": "Free parking", "am.safety": "Fire extinguisher, first aid kit, smoke & CO alarms",
    "gallery.eyebrow": "Photos", "gallery.title": "A look inside Green House",
    "loc.eyebrow": "Location", "loc.title": "Schinias, Attica",
    "loc.p1": "The house sits in a quiet area of Schinias, a few minutes from one of the longest sandy beaches in Attica, with pine trees down to the water and shallow sea for children.",
    "near.1": "Schinias beach", "near.2": "Schinias – Marathon National Park", "near.3": "Olympic Rowing Centre", "near.4": "Marathon, Rhamnous and Athens",
    "loc.address": "Kronou, Schinias, 190 07 Attica",
    "rules.eyebrow": "Good to know", "rules.title": "Before you arrive",
    "rules.1": "Up to 6 guests", "rules.3": "Pets allowed",
    "rules.4": "No smoking (including e-cigarettes)", "rules.5": "No parties or events", "rules.6": "Exterior security camera on the property",
    "contact.eyebrow": "Book & contact", "contact.title": "Come and stay at Green House",
    "contact.lead": "To book or ask anything, contact us directly. If you prefer, you can also book through Airbnb.",
    "footer.ama": "Property Reg. No.",
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
