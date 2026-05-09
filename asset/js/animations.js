const Animations = (() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
  );

  function observe() {
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
      observer.observe(el);
    });
  }

  function popBadge(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("badge-pop");
    void el.offsetWidth;
    el.classList.add("badge-pop");
    el.addEventListener("animationend", () => el.classList.remove("badge-pop"), { once: true });
  }

  function flashButton(btn) {
    if (!btn) return;
    btn.classList.add("btn-cart-added");
    btn.addEventListener("animationend", () => btn.classList.remove("btn-cart-added"), { once: true });
  }

  function pageIn() {
    document.body.classList.add("page-ready");
  }

  document.addEventListener("DOMContentLoaded", () => {
    pageIn();
    observe();
  });

  return { observe, popBadge, flashButton };
})();
