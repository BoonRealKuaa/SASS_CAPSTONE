const CartController = (() => {
  function init() {
    renderCart();
    bindEvents();
  }

  function renderCart() {
    const cart = CartService.getCart();
    CartView.render(cart.mangGioHang, cart.tinhTongTien());
  }

  function bindEvents() {
    const container = document.getElementById("cart-container");
    if (!container) return;

    container.addEventListener("click", (e) => {
      const removeBtn = e.target.closest("[data-remove]");
      if (removeBtn) {
        CartService.removeFromCart(removeBtn.dataset.remove);
        renderCart();
        return;
      }

      const plusBtn = e.target.closest("[data-plus]");
      if (plusBtn) {
        const id = Number(plusBtn.dataset.plus);
        const item = CartService.getCart().mangGioHang.find((i) => i.id === id);
        if (item) {
          CartService.updateQuantity(id, item.quality + 1);
          renderCart();
        }
        return;
      }

      const minusBtn = e.target.closest("[data-minus]");
      if (minusBtn) {
        const id = Number(minusBtn.dataset.minus);
        const item = CartService.getCart().mangGioHang.find((i) => i.id === id);
        if (item) {
          CartService.updateQuantity(id, item.quality - 1);
          renderCart();
        }
      }
    });

    document.getElementById("btn-clear-cart")?.addEventListener("click", () => {
      if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
        CartService.clearCart();
        renderCart();
      }
    });
  }

  return { init };
})();
