(() => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const faqButtons = Array.from(document.querySelectorAll(".faq-q"));
  const revealNodes = Array.from(document.querySelectorAll(".reveal"));
  const yearNode = document.getElementById("year");

  function closeMobileMenu() {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
  }

  function openMobileMenu() {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("open");
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("open");
      if (isOpen) {
        closeMobileMenu();
        return;
      }
      openMobileMenu();
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMobileMenu());
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  faqButtons.forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      if (!item) return;

      const isOpen = item.classList.contains("open");

      faqButtons.forEach((otherButton) => {
        const otherItem = otherButton.closest(".faq-item");
        if (!otherItem) return;
        otherItem.classList.remove("open");
        otherButton.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );

    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("visible"));
  }
})();
