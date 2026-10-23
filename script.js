/**
 * Frames by Tausif — Video Editor Portfolio
 * Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- Video Database (Connected to YouTube Videos) ---
  const videoDatabase = {
    property: {
      title: "Property & Space Film",
      meta: "Interior Cinematography • 9:16 Vertical Reel",
      desc: "Capturing architectural spaces, warm wooden textures, and ambient lighting with precise cuts and color grading.",
      videoUrl: "https://www.youtube.com/shorts/IX9SB7xgrm8",
      aspectRatio: "vertical"
    },
    campus: {
      title: "Campus Stories & Event Film",
      meta: "Night Atmosphere • 9:16 Vertical Reel",
      desc: "Capturing night celebrations, glowing campus architecture, and authentic college energy with high-retention pacing.",
      videoUrl: "https://www.youtube.com/shorts/IeJHrRxvccE",
      aspectRatio: "vertical"
    },
    ai_shortfilm: {
      title: "AI Cinematic Short Film",
      meta: "Neural Video Generation • 2.5K Widescreen",
      desc: "An atmospheric exploration blending generative visual AI tools with narrative editing, custom sound design, and color grading.",
      videoUrl: "https://youtu.be/X8YuA3vO2_Y",
      aspectRatio: "widescreen"
    },
    showreel: {
      title: "Frames by Tausif — Highlight Reel",
      meta: "Commercial, Narrative & AI Showcase",
      desc: "A fast-paced showcase of editing rhythm, color science, sound design, and generative AI visuals.",
      videoUrl: "https://youtu.be/X8YuA3vO2_Y",
      aspectRatio: "widescreen"
    }
  };

  /* ==========================================================================
     1. Sticky Header & Scroll Effects
     ========================================================================== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     2. Mobile Menu Toggle
     ========================================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     3. Project Filter Tabs
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     4. Interactive Comparison Slider (Raw LOG vs. Graded)
     ========================================================================== */
  const sliderContainer = document.getElementById('comparisonSlider');
  const afterLayer = document.getElementById('afterLayer');
  const sliderHandle = document.getElementById('sliderHandle');

  if (sliderContainer && afterLayer && sliderHandle) {
    let isDragging = false;

    const setSliderPosition = (x) => {
      const rect = sliderContainer.getBoundingClientRect();
      let position = ((x - rect.left) / rect.width) * 100;

      // Keep within 0% to 100%
      if (position < 0) position = 0;
      if (position > 100) position = 100;

      afterLayer.style.width = `${position}%`;
      sliderHandle.style.left = `${position}%`;
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setSliderPosition(clientX);
    };

    sliderContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    sliderContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
  }

  /* ==========================================================================
     5. Video Project Modal & Player
     ========================================================================== */
  const videoModal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalMeta = document.getElementById('modalProjectMeta');
  const modalDetailTitle = document.getElementById('modalDetailTitle');
  const modalDetailDesc = document.getElementById('modalDetailDesc');
  const modalVideoElement = document.getElementById('modalVideoElement');
  const modalYoutubeIframe = document.getElementById('modalYoutubeIframe');
  const playerOverlay = document.getElementById('playerOverlay');
  const modalWindow = document.querySelector('.modal-window');

  // Helper to convert any YouTube URL to embed format
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
    }
    return url;
  };

  const openModal = (videoKey, fallbackTitle = '') => {
    const data = videoDatabase[videoKey] || {
      title: fallbackTitle || "Selected Video Edit",
      meta: "Cinematic Grade & Motion",
      desc: "Designed with precision rhythm, audio design, and color grading.",
      videoUrl: "",
      aspectRatio: "widescreen"
    };

    modalTitle.textContent = data.title;
    modalMeta.textContent = data.meta;
    modalDetailTitle.textContent = data.title;
    modalDetailDesc.textContent = data.desc;

    // Adapt layout for 9:16 vertical reels vs 16:9 widescreen
    if (data.aspectRatio === 'vertical') {
      modalWindow.classList.add('vertical-mode');
    } else {
      modalWindow.classList.remove('vertical-mode');
    }

    if (data.videoUrl) {
      playerOverlay.style.display = 'none';

      // Check if YouTube link
      if (data.videoUrl.includes('youtube.com') || data.videoUrl.includes('youtu.be')) {
        if (modalVideoElement) {
          modalVideoElement.pause();
          modalVideoElement.style.display = 'none';
        }
        if (modalYoutubeIframe) {
          modalYoutubeIframe.style.display = 'block';
          modalYoutubeIframe.src = getYoutubeEmbedUrl(data.videoUrl);
        }
      } else {
        // Local MP4 or direct video file
        if (modalYoutubeIframe) {
          modalYoutubeIframe.style.display = 'none';
          modalYoutubeIframe.src = '';
        }
        if (modalVideoElement) {
          modalVideoElement.style.display = 'block';
          modalVideoElement.src = data.videoUrl;
          modalVideoElement.load();
          modalVideoElement.play().catch(() => {
            modalVideoElement.controls = true;
          });
        }
      }
    } else {
      if (modalVideoElement) modalVideoElement.style.display = 'none';
      if (modalYoutubeIframe) modalYoutubeIframe.style.display = 'none';
      playerOverlay.style.display = 'block';
    }

    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    if (modalVideoElement) {
      modalVideoElement.pause();
      modalVideoElement.src = '';
    }
    if (modalYoutubeIframe) {
      modalYoutubeIframe.src = '';
    }
    if (modalWindow) {
      modalWindow.classList.remove('vertical-mode');
    }
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Esc key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach click listener to project cards
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const media = card.querySelector('.card-media');
      const videoType = media ? media.getAttribute('data-video-type') : '';
      const cardTitle = media ? media.getAttribute('data-title') : '';
      openModal(videoType, cardTitle);
    });
  });

  // Play Showreel button
  const playReelBtn = document.getElementById('playReelBtn');
  if (playReelBtn) {
    playReelBtn.addEventListener('click', () => {
      openModal('showreel', 'Frames by Tausif — Showreel');
    });
  }

  /* ==========================================================================
     6. Dynamic Stats Count-up on Scroll
     ========================================================================== */
  const metricNumbers = document.querySelectorAll('.metric-number[data-target]');
  let hasAnimatedMetrics = false;

  const countUp = () => {
    const metricsSection = document.querySelector('.approach-section');
    if (!metricsSection) return;

    const rect = metricsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.8 && !hasAnimatedMetrics) {
      hasAnimatedMetrics = true;

      metricNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = `${target}+`;
            clearInterval(timer);
          } else {
            el.textContent = `${current}+`;
          }
        }, 30);
      });
    }
  };

  window.addEventListener('scroll', countUp);
  countUp(); // trigger once on load if already in viewport

});
