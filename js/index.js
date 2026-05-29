

    // Smooth navbar hover animation
    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {
      link.addEventListener("mouseenter", () => {
        link.style.transform = "translateY(-2px)";
      });

      link.addEventListener("mouseleave", () => {
        link.style.transform = "translateY(0)";
      });
    });

    // Button click effect
    const buttons = document.querySelectorAll("button");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {

        btn.style.transform = "scale(0.96)";

        setTimeout(() => {
          btn.style.transform = "";
        }, 150);

      });
    });

    // Sticky header and background change on scroll
    const navbar = document.querySelector('.navbar');
    const servicesSection = document.getElementById('services');
    const servicesLink = document.querySelector('.nav-links a[href="#services"]');

    function onScroll() {
      if (window.scrollY > 50) {
        if (!navbar.classList.contains('scrolled')) {
          navbar.classList.add('scrolled');
          // prevent layout jump by adding top padding equal to navbar height
          document.body.style.paddingTop = navbar.offsetHeight + 'px';
        }
      } else {
        if (navbar.classList.contains('scrolled')) {
          navbar.classList.remove('scrolled');
          document.body.style.paddingTop = '';
        }
      }
    }

    window.addEventListener('scroll', onScroll, {passive:true});
    // run once in case page loads already scrolled
    onScroll();

    // Ensure Services link scrolls smoothly across browsers
    if (servicesLink && servicesSection) {
      servicesLink.addEventListener('click', function(e){
        e.preventDefault();
        servicesSection.scrollIntoView({behavior:'smooth', block:'start'});
      });
    }

    // Highlight nav links as active on click and when their section is in view
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    // helper to remove active from all
    function clearActive(){
      navLinks.forEach(l => l.classList.remove('active'));
    }

    // Click handler: smooth scroll and set active
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
        clearActive();
        link.classList.add('active');
      });
    });

    // IntersectionObserver to update active link on scroll
    const observerOptions = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 };
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const correspondingLink = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (entry.isIntersecting) {
          clearActive();
          if (correspondingLink) correspondingLink.classList.add('active');
        }
      });
    }, observerOptions);

    // observe sections that have matching nav links
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) sectionObserver.observe(target);
    });

    // Project tabs toggling (Actual / Rendered)
    (function(){
      const tabActual = document.getElementById('tab-actual');
      const tabRendered = document.getElementById('tab-rendered');
      const projectsGrid = document.querySelector('.projects-grid');
      const renderedGrid = document.querySelector('.rendered-grid');

      function showActual(e){
        if(e) e.preventDefault();
        tabActual && tabActual.classList.add('active');
        tabRendered && tabRendered.classList.remove('active');
        if(projectsGrid) projectsGrid.style.display = '';
        if(renderedGrid) renderedGrid.style.display = 'none';
      }

      function showRendered(e){
        if(e) e.preventDefault();
        tabRendered && tabRendered.classList.add('active');
        tabActual && tabActual.classList.remove('active');
        if(projectsGrid) projectsGrid.style.display = 'none';
        if(renderedGrid) renderedGrid.style.display = '';
      }

      tabActual && tabActual.addEventListener('click', showActual);
      tabRendered && tabRendered.addEventListener('click', showRendered);

      // initialize: show Actual by default
      showActual();
    })();

    // Mobile menu toggle
    (function(){
      const menuToggle = document.querySelector('.menu-toggle');
      const mobileMenu = document.querySelector('.mobile-menu');
      const mobileBackdrop = document.querySelector('.mobile-menu-backdrop');
      const closeBtn = document.querySelector('.mobile-menu-close');

      function openMenu(){
        if(!mobileMenu) return;
        mobileMenu.classList.add('open');
        mobileBackdrop && mobileBackdrop.classList.add('open');
        mobileMenu.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
      }

      function closeMenu(){
        if(!mobileMenu) return;
        mobileMenu.classList.remove('open');
        mobileBackdrop && mobileBackdrop.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden','true');
        document.body.style.overflow = '';
      }

      menuToggle && menuToggle.addEventListener('click', openMenu);
      closeBtn && closeBtn.addEventListener('click', closeMenu);
      mobileBackdrop && mobileBackdrop.addEventListener('click', closeMenu);

      window.addEventListener('resize', () => {
        if(window.innerWidth > 992) closeMenu();
      });
    })();

    
    (function(){
      const modalBackdrop = document.getElementById('contactModal');
      const openers = document.querySelectorAll('#contact, .quote-btn');
      const closeBtns = modalBackdrop ? modalBackdrop.querySelectorAll('.modal-close') : [];
      const form = document.getElementById('contactForm');

      function openModal(){
        if(!modalBackdrop) return;
        modalBackdrop.classList.add('open');
        modalBackdrop.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
        // focus first field
        const first = modalBackdrop.querySelector('input, textarea');
        first && first.focus();
      }

      function closeModal(){
        if(!modalBackdrop) return;
        modalBackdrop.classList.remove('open');
        modalBackdrop.setAttribute('aria-hidden','true');
        document.body.style.overflow = '';
      }

      openers.forEach(op => op.addEventListener('click', function(e){ e.preventDefault(); openModal(); }));
      closeBtns.forEach(b => b.addEventListener('click', closeModal));
      modalBackdrop && modalBackdrop.addEventListener('click', function(e){ if(e.target === modalBackdrop) closeModal(); });

      // simple form handler (prevent actual submit for now)
      form && form.addEventListener('submit', function(e){
        e.preventDefault();
        // basic validation
        const name = form.querySelector('#contact-name').value.trim();
        const email = form.querySelector('#contact-email').value.trim();
        const message = form.querySelector('#contact-message').value.trim();
        if(!name || !email || !message){
          alert('Please fill Name, Email and Message.');
          return;
        }
        // TODO: wire to backend / email service
        alert('Thanks, your message has been sent.');
        form.reset();
        closeModal();
      });
    })();
  