# Green House Schinias

Στατικό site για το Green House στον Σχινιά (ελληνικά / English).

## Πώς αλλάζω τα στοιχεία

Όλα τα βασικά (σύνδεσμος Airbnb, τηλέφωνο, email, WhatsApp, Instagram, φωτογραφίες και λεζάντες) είναι στο `js/config.js`. Ό,τι μείνει κενό (`""`) κρύβεται από το site.

Οι φωτογραφίες προς το παρόν φορτώνουν από το Airbnb. Για να μην εξαρτάται το site από την αγγελία, βάλτε τις φωτογραφίες στον φάκελο `images/` και αλλάξτε το `src` στο `js/config.js` (π.χ. `src: "images/garden-01.jpg"`).

Τα αγγλικά κείμενα είναι στο `js/main.js` (λίστα `EN`), τα ελληνικά στο `index.html`.

## Δημοσίευση (GitHub Pages)

Settings → Pages → Source: Deploy from a branch → `main` και `/ (root)`.
