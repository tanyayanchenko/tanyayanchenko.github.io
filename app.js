const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuClose = document.querySelector("[data-menu-close]");
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function openMenu() {
  if (!menuButton || !mobileMenu) return;
  mobileMenu.classList.add("is-open");
  menuButton.classList.add("is-active");
  menuButton.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  if (!menuButton || !mobileMenu) return;
  mobileMenu.classList.remove("is-open");
  menuButton.classList.remove("is-active");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function toggleMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.contains("is-open") ? closeMenu() : openMenu();
}

menuButton?.addEventListener("click", toggleMenu);
menuClose?.addEventListener("click", closeMenu);
mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

mobileMenu?.addEventListener("click", (event) => {
  if (event.target === mobileMenu) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 1180) closeMenu();
});

updateHeader();

const programSlider = document.querySelector("[data-program-slider]");

if (programSlider) {
  const previousButton = document.querySelector("[data-program-prev]");
  const nextButton = document.querySelector("[data-program-next]");
  const currentElement = document.querySelector("[data-program-current]");
  const totalElement = document.querySelector("[data-program-total]");
  const progressElement = document.querySelector("[data-program-progress]");
  const cards = Array.from(programSlider.querySelectorAll(".program-card"));

  const getVisibleCards = () => {
    return window.matchMedia("(max-width: 760px)").matches ? 1 : 2;
  };

  const getStep = () => {
    const firstCard = cards[0];

    if (!firstCard) {
      return 0;
    }

    const styles = window.getComputedStyle(programSlider);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;

    return firstCard.getBoundingClientRect().width + gap;
  };

  const getCurrentIndex = () => {
    const step = getStep();

    if (!step) {
      return 0;
    }

    return Math.round(programSlider.scrollLeft / step);
  };

  const updateProgramSlider = () => {
    const currentIndex = getCurrentIndex();
    const visibleCards = getVisibleCards();
    const maximumIndex = Math.max(0, cards.length - visibleCards);

    const safeIndex = Math.min(currentIndex, maximumIndex);
    const visibleNumber = Math.min(safeIndex + 1, cards.length);

    if (currentElement) {
      currentElement.textContent = String(visibleNumber).padStart(2, "0");
    }

    if (totalElement) {
      totalElement.textContent = String(cards.length).padStart(2, "0");
    }

    if (progressElement) {
      const progress = ((safeIndex + visibleCards) / cards.length) * 100;
      progressElement.style.width = `${Math.min(progress, 100)}%`;
    }

    if (previousButton) {
      previousButton.disabled = safeIndex <= 0;
    }

    if (nextButton) {
      nextButton.disabled = safeIndex >= maximumIndex;
    }
  };

  const moveProgramSlider = (direction) => {
    const step = getStep();

    programSlider.scrollBy({
      left: step * direction,
      behavior: "smooth",
    });
  };

  previousButton?.addEventListener("click", () => {
    moveProgramSlider(-1);
  });

  nextButton?.addEventListener("click", () => {
    moveProgramSlider(1);
  });

  programSlider.addEventListener("scroll", updateProgramSlider, {
    passive: true,
  });

  window.addEventListener("resize", updateProgramSlider);

  updateProgramSlider();
}

/* ======================================
   Mentor Slider
====================================== */

const mentorSlider = document.querySelector("[data-mentor-slider]");

if (mentorSlider) {
  const previousButton = document.querySelector("[data-mentor-prev]");
  const nextButton = document.querySelector("[data-mentor-next]");
  const currentElement = document.querySelector("[data-mentor-current]");
  const totalElement = document.querySelector("[data-mentor-total]");
  const progressElement = document.querySelector("[data-mentor-progress]");

  const cards = Array.from(mentorSlider.querySelectorAll(".mentor-benefit"));

  const getVisibleCards = () => {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1180) return 2;

    return 3;
  };

  const getStep = () => {
    const firstCard = cards[0];

    if (!firstCard) return 0;

    const styles = window.getComputedStyle(mentorSlider);

    const gap = parseFloat(styles.columnGap || styles.gap) || 0;

    return firstCard.getBoundingClientRect().width + gap;
  };

  const getCurrentIndex = () => {
    const step = getStep();

    if (!step) return 0;

    return Math.round(mentorSlider.scrollLeft / step);
  };

  const updateSlider = () => {
    const currentIndex = getCurrentIndex();

    const visibleCards = getVisibleCards();

    const maxIndex = Math.max(0, cards.length - visibleCards);

    const safeIndex = Math.min(currentIndex, maxIndex);

    if (currentElement) {
      currentElement.textContent = String(safeIndex + 1).padStart(2, "0");
    }

    if (totalElement) {
      totalElement.textContent = String(cards.length).padStart(2, "0");
    }

    if (progressElement) {
      const progress = ((safeIndex + visibleCards) / cards.length) * 100;

      progressElement.style.width = `${Math.min(progress, 100)}%`;
    }

    previousButton.disabled = safeIndex <= 0;
    nextButton.disabled = safeIndex >= maxIndex;
  };

  const moveSlider = (direction) => {
    mentorSlider.scrollBy({
      left: getStep() * direction,

      behavior: "smooth",
    });
  };

  previousButton?.addEventListener("click", () => {
    moveSlider(-1);
  });

  nextButton?.addEventListener("click", () => {
    moveSlider(1);
  });

  mentorSlider.addEventListener("scroll", updateSlider, { passive: true });

  window.addEventListener("resize", updateSlider);

  updateSlider();
}

/* ======================================
   FAQ Accordion
====================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-item__button");

  if (!button) return;

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    faqItems.forEach((faqItem) => {
      const faqButton = faqItem.querySelector(".faq-item__button");

      faqItem.classList.remove("is-open");
      faqButton?.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});
