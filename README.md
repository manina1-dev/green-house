# Green House Schinias

Στατικό site για το Green House στον Σχινιά (ελληνικά / English).

## Πώς αλλάζω τα στοιχεία

Όλα τα βασικά (σύνδεσμος Airbnb, τηλέφωνο, email, WhatsApp, Instagram, φωτογραφίες και λεζάντες) είναι στο `js/config.js`. Ό,τι μείνει κενό (`""`) κρύβεται από το site.

Οι φωτογραφίες είναι στον φάκελο `images/` (η μεγάλη φωτογραφία της αρχικής είναι το `images/hero.jpg`). Για νέα φωτογραφία, ανεβάστε την εκεί και προσθέστε μια γραμμή στη λίστα `photos` στο `js/config.js`.

Τα αγγλικά κείμενα είναι στο `js/main.js` (λίστα `EN`), τα ελληνικά στο `index.html`.

## Δημοσίευση (GitHub Pages)

Settings → Pages → Source: Deploy from a branch → `main` και `/ (root)`.

## Ημερολόγιο διαθεσιμότητας (Airbnb)

Το `.github/workflows/airbnb-calendar.yml` διαβάζει κάθε 3 ώρες το ημερολόγιο του Airbnb και γράφει το `data/availability.json` (μόνο κλεισμένες ημερομηνίες). Ο σύνδεσμος iCal του Airbnb μπαίνει ως secret: Settings → Secrets and variables → Actions → `AIRBNB_ICAL_URL`. Χωρίς αυτόν, ο συγχρονισμός απλώς παραλείπεται. Χειροκίνητος συγχρονισμός: Actions → Airbnb calendar sync → Run workflow.
