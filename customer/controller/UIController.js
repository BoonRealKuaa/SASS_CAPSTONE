const UIController = (() => {
  let carousel = null;
  let offcanvas = null;

  function initCarousel() {
    const carouselEl = document.getElementById("banner-carousel");
    if (!carouselEl) return;

    carousel = new bootstrap.Carousel(carouselEl, {
      interval: 4000,
      wrap: true,
    });

    // Nút prev / next
    document.getElementById("carousel-prev")?.addEventListener("click", () => {
      carousel.prev();
    });

    document.getElementById("carousel-next")?.addEventListener("click", () => {
      carousel.next();
    });

    // Dot indicators
    carouselEl.querySelectorAll("[data-slide-to]").forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = Number(dot.dataset.slideTo);
        carousel.to(index);
      });
    });

    // Cập nhật dot active khi slide thay đổi
    carouselEl.addEventListener("slide.bs.carousel", (e) => {
      carouselEl.querySelectorAll("[data-slide-to]").forEach((dot, i) => {
        dot.classList.toggle("active", i === e.to);
        if (i === e.to) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    });
  }

  function initCartOffcanvas() {
    const offcanvasEl = document.getElementById("cartOffcanvas");
    if (!offcanvasEl) return;

    offcanvas = new bootstrap.Offcanvas(offcanvasEl);

    document.getElementById("btn-cart")?.addEventListener("click", () => {
      const cart = CartService.getCart();
      CartOffcanvasView.render(cart.mangGioHang, cart.tinhTongTien());
      offcanvas.show();
    });
  }

  function init() {
    initCarousel();
    initCartOffcanvas();
  }

  function showCartOffcanvas() {
    offcanvas?.show();
  }

  return { init, showCartOffcanvas };
})();
