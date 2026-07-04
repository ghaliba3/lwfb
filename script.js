/* Lets Work For Bangladesh — SPA interactions (vanilla JS, no build step) */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---- Footer year ---- */
  $("#year").textContent = new Date().getFullYear();

  /* ---- Sticky nav shadow ---- */
  const nav = $("#nav");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 8);
    $("#toTop").classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---- Team data (elected volunteer committee) ---- */
  const TEAM = {
    exec: [
      ["Zahid Ali Khan", "President"],
      ["Dr Bilquis F Ara", "Vice President"],
      ["Zafreen Ahmed", "General Secretary"],
      ["Reza Karim", "Joint Secretary — Sydney"],
      ["Tanzim Rashid Khan", "Treasurer"],
    ],
    committee: [
      ["Shamsuddin Shafi", "Committee (Biplob)"],
      ["Nicholas Lee Murphy", "Committee"],
      ["Dr Olav Muurlink", "Committee"],
      ["Borhan Shafi", "Committee (Bijoy)"],
    ],
    regional: [
      ["Redwan Huda", "USA — Dallas"],
      ["Tanzeena Mehjabeen", "USA — Minnesota"],
      ["Ahmed Kabir Chowdhury", "UK — London"],
      ["Merina Islam Bithi", "Canada — Ontario"],
      ["Hasan Mahmud", "IT & Social Strategy"],
    ],
  };
  const PALETTE = ["#006a4e", "#00795a", "#f42a41", "#d81f36", "#2a9d8f", "#264653", "#0077b6", "#e76f51"];
  const initials = (n) => n.replace(/^(Dr|Mr|Ms|Mrs)\s+/i, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  Object.entries(TEAM).forEach(([group, people]) => {
    const grid = $(`[data-team="${group}"]`);
    if (!grid) return;
    people.forEach(([name, role], i) => {
      const el = document.createElement("div");
      el.className = "member reveal";
      const color = PALETTE[i % PALETTE.length];
      el.innerHTML =
        `<div class="avatar" style="background:${color}">${initials(name)}</div>` +
        `<div class="name">${name}</div><div class="role">${role}</div>`;
      grid.appendChild(el);
    });
  });

  /* ---- Reveal on scroll ---- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---- Animated number counters ---- */
  const fmt = (n) => n.toLocaleString("en-US");
  function animateCount(el) {
    const target = Number(el.dataset.count || 0);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  $$("[data-count]").forEach((el) => countObserver.observe(el));

  /* ---- Funding progress bars ---- */
  const progObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const wrap = entry.target;
        const bar = $(".progress-bar span", wrap);
        if (bar && !wrap.dataset.mode) {
          const raised = Number(wrap.dataset.raised || 0);
          const goal = Number(wrap.dataset.goal || 1);
          const pct = Math.max(2, Math.min(100, Math.round((raised / goal) * 100)));
          requestAnimationFrame(() => (bar.style.width = pct + "%"));
        }
        progObserver.unobserve(wrap);
      });
    },
    { threshold: 0.4 }
  );
  $$(".progress").forEach((el) => progObserver.observe(el));

  /* ---- Newsletter (client-side only demo) ---- */
  const form = $("#subscribe");
  const note = $("#formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#email").value.trim();
    const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!valid) {
      note.style.color = "var(--red)";
      note.textContent = "Please enter a valid email address.";
      return;
    }
    note.style.color = "var(--green)";
    note.textContent = "Thank you! We'll keep you posted on projects and appeals.";
    form.reset();
  });
})();
