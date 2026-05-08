const ProductDetailController = (() => {
  let _product = null;
  let _qty = 1;

  function init() {
    ProductService.init().then(() => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      _product = ProductService.getById(id);

      if (!_product) {
        ProductDetailView.showNotFound();
        return;
      }

      ProductDetailView.render(_product);
      ProductDetailView.updateBadge(CartService.getTotalItems());
      _bindEvents();
    });
  }

  function _bindEvents() {
    document.getElementById("btn-qty-minus").addEventListener("click", () => {
      if (_qty > 1) {
        _qty--;
        document.getElementById("input-qty").value = _qty;
      }
    });

    document.getElementById("btn-qty-plus").addEventListener("click", () => {
      if (_qty < 99) {
        _qty++;
        document.getElementById("input-qty").value = _qty;
      }
    });

    document.getElementById("btn-add-cart").addEventListener("click", () => {
      for (let i = 0; i < _qty; i++) {
        CartService.addToCart(_product);
      }
      ProductDetailView.updateBadge(CartService.getTotalItems());
      ProductDetailView.showToast(`Đã thêm ${_qty} x ${_product.name} vào giỏ hàng`);
    });

    document.getElementById("btn-cart-detail").addEventListener("click", () => {
      window.location.href = "../../index.html";
    });
  }

  return { init };
})();
