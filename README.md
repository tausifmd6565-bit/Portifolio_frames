# Frames by Tausif — Video Editor Portfolio

A sleek, cinematic, high-retention portfolio website built for **Md Tausif** (Video Editor & AI Visual Creator).

---

## 🌟 Key Upgrades & Changes Implemented

1. **Header Section & Branding ("frames by tausif"):**
   - Redesigned with a glowing cinematic film perforation mark and pulsing indicator.
   - Glassmorphism backdrop blur on scroll.
   - Removed the `04` superscript from the navbar (`Work` is now clean and elegant).
   - Added a live **"Available for Projects"** status indicator with direct 1-click WhatsApp connect.

2. **Contact & Social Integrations:**
   - **Instagram:** Direct link to [`@intellectuallthinkr`](https://instagram.com/intellectuallthinkr).
   - **WhatsApp:** Direct click-to-chat with formatted message to [`+91 8434596679`](https://wa.me/918434596679).
   - Added a floating quick-contact WhatsApp action button on the bottom right.

3. **Removed "Naved Proctor" Video:**
   - Completely removed the previous clip.
   - Replaced with a cutting-edge **"Neural Atmosphere & Motion / AI Concept Film"** project card highlighting your B.Tech in AI background at AMU.

4. **Dynamic Features Added:**
   - **Interactive Before & After Color Grading Slider:** Lets clients drag between Raw Flat LOG footage and a Final Cinematic Grade.
   - **Work Filter Tabs:** One-click filter for `All Edits`, `Commercial & Campus`, and `AI & Visual Films`.
   - **Video Preview Modal:** Click any project card or the Showreel banner to open a cinematic modal player.
   - **Dynamic Stat Counters:** Smooth animated counter for `150+` videos edited, `99%` on-time delivery.
   - **Film Grain & Ambient Glow:** Subtle dark emerald & charcoal aesthetic matching top boutique post-production studios.

---

## 🎬 How to Add Your Videos

Open `script.js` and locate the `videoDatabase` object at the top:

```javascript
const videoDatabase = {
  property: {
    title: "Property & Space Film",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID" // <- Paste your YouTube embed or MP4 URL here
  },
  campus: {
    title: "Campus Stories & Event Film",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
  },
  // ...
};
```

If using YouTube, make sure to use the `/embed/` format (e.g. `https://www.youtube.com/embed/dQw4w9WgXcQ`).

---

## 🚀 How to View Locally
Simply double-click `index.html` in file explorer to open it in Chrome, Edge, or Brave.
