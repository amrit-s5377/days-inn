  gsap.registerPlugin(ScrollTrigger);

      /* ── LOADER ── */
      window.addEventListener("load", () => {
        const tl = gsap.timeline();
        tl.to("#ldLogo", {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        })
          .to(
            "#ldFill",
            { width: "100%", duration: 1.6, ease: "power2.inOut" },
            "-=0.3",
          )
          .to("#loader", {
            yPercent: -100,
            duration: 0.85,
            ease: "power3.inOut",
            delay: 0.2,
            onComplete() {
              document.getElementById("loader").style.display = "none";
              initHero();
              initScroll();
            },
          });
      });

      /* ── HERO ENTRANCE ── */
      function initHero() {
        gsap.to("#hBadge", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.05,
          ease: "power3.out",
        });
        gsap.to("#hTitle", {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.22,
          ease: "power3.out",
        });
        gsap.to("#hSub", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
        });
        gsap.to("#hBtns", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.56,
          ease: "power3.out",
        });
        gsap.to("#hScroll", {
          opacity: 1,
          duration: 0.7,
          delay: 0.9,
          ease: "power2.out",
        });
        // fact items
        gsap.to(".fact-item", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.7,
          ease: "power3.out",
        });
      }

      /* ── SCROLL ANIMATIONS ── */
      function initScroll() {
        ScrollTrigger.getAll().forEach((t) => t.kill());

        // hero BG parallax
        gsap.to("#heroBg", {
          yPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        // parallax band
        gsap.to("#parBg", {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: "#parSec",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // generic reveals
        gsap.utils.toArray(".reveal").forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
        gsap.utils.toArray(".reveal-l").forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        gsap.utils.toArray(".reveal-r").forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        gsap.utils.toArray(".reveal-sc").forEach((el, i) => {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            delay: i * 0.07,
          });
        });
      }

      /* ── NAV ── */
      const nav = document.getElementById("mainNav");
      function updateNav() {
        const inHero = window.scrollY < window.innerHeight * 0.8;
        nav.classList.toggle("light", !inHero);
      }
      window.addEventListener("scroll", updateNav, { passive: true });
      updateNav();

      /* ── HAMBURGER ── */
      const ham = document.getElementById("navHam");
      const mob = document.getElementById("mobMenu");
      ham.addEventListener("click", () => {
        ham.classList.toggle("open");
        mob.classList.toggle("open");
      });
      function closeMenu() {
        ham.classList.remove("open");
        mob.classList.remove("open");
      }

      /* ── SMOOTH SCROLL helper ── */
      function navScrollTo(id) {
        closeMenu();
        // If detail page is active, go home first, then scroll after transition
        const landingActive = document
          .getElementById("landingPg")
          .classList.contains("active");
        if (!landingActive) {
          // switch to landing page
          document.getElementById("detailPg").classList.remove("active");
          document.getElementById("landingPg").classList.add("active");
          window.scrollTo({ top: 0 });
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
            initScroll();
            updateNav();
          }, 100);
          return;
        }
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }

      /* ── PAGE TRANSITIONS ── */
      function goHome() {
        closeMenu();
        gsap.to("#detailPg", {
          opacity: 0,
          y: 16,
          duration: 0.38,
          ease: "power2.in",
          onComplete() {
            document.getElementById("detailPg").classList.remove("active");
            document.getElementById("landingPg").classList.add("active");
            window.scrollTo({ top: 0 });
            gsap.fromTo(
              "#landingPg",
              { opacity: 0 },
              { opacity: 1, duration: 0.5, ease: "power2.out" },
            );
            setTimeout(initScroll, 80);
            updateNav();
          },
        });
      }

      function openDetail() {
        // set hero bg
        document.getElementById("dBg").style.backgroundImage =
          "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2200&q=90')";

        // set default dates
        const t = new Date(),
          t2 = new Date();
        t2.setDate(t.getDate() + 2);
        document.getElementById("bcIn").value = t.toISOString().split("T")[0];
        document.getElementById("bcOut").value = t2.toISOString().split("T")[0];

        gsap.to("#landingPg", {
          opacity: 0,
          y: -12,
          duration: 0.38,
          ease: "power2.in",
          onComplete() {
            document.getElementById("landingPg").classList.remove("active");
            document.getElementById("detailPg").classList.add("active");
            window.scrollTo({ top: 0 });
            nav.classList.remove("light");
            gsap.fromTo(
              "#detailPg",
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
            );

            // detail hero parallax
            ScrollTrigger.getAll().forEach((t) => t.kill());
            gsap.to("#dBg", {
              yPercent: 18,
              ease: "none",
              scrollTrigger: {
                trigger: ".d-hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          },
        });
      }