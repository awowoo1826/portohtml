/**
 * PORTOFOLIO SYIFA - INTERAKTIVITAS MODERN
 * JavaScript Murni (Vanilla JS) - Ringan & Efisien
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. ELEMEN SELEKTOR
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTop');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  // 2. STICKY NAVBAR PADA SCROLL
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Tombol Back to Top tampil setelah scroll 400px
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger saat pertama kali dimuat

  // 3. TOGGLE MOBILE MENU (HAMBURGER)
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Tutup menu mobile ketika salah satu tautan diklik
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. HIGHLIGHT ACTIVE NAV LINK BERDASARKAN SCROLL
  const sections = document.querySelectorAll('section[id]');
  const highlightNavLink = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // 5. TOMBOL BACK TO TOP
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. FILTER KATEGORI PROYEK
  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Hapus kelas aktif dari semua tombol filter
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 7. FORMULIR KONTAK INTERAKTIF
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value.trim() || 'Pesan dari Website Portofolio';
      const message = document.getElementById('senderMessage').value.trim();

      if (!name || !email || !message) {
        showFeedback('Harap lengkapi semua bidang yang wajib diisi (*).', 'error');
        return;
      }

      // Simulasi pengiriman sukses & menyiapkan tautan mailto cadangan
      const mailtoLink = `mailto:syifa.azzahra@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`;

      showFeedback(`Terima kasih ${name}! Pesan Anda sedang diproses. Anda juga dapat langsung mengirimkan via email.`, 'success');

      // Buka aplikasi mailto pengguna secara otomatis setelah 800ms
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 1000);

      // Reset form setelah 2 detik
      setTimeout(() => {
        contactForm.reset();
      }, 2500);
    });
  }

  function showFeedback(text, type) {
    if (!formFeedback) return;
    formFeedback.textContent = text;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';

    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 6000);
  }
});
