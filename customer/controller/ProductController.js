const ProductController = (() => {
  let allProducts = [];
  let currentType = "all";
  let searchKeyword = "";

  async function init() {
    await ProductService.init();
    allProducts = ProductService.getAll();
    renderProductList(allProducts);
    renderTypeFilter(allProducts);
    bindEvents();
    bindOffcanvasEvents();
    updateCartBadge();
  }

  function renderProductList(products) {
    const container = document.getElementById("product-list");
    if (!container) return;

    if (products.length === 0) {
      container.innerHTML = `<div class="col-12 text-center py-5">
        <p class="text-muted">Không tìm thấy sản phẩm nào.</p>
      </div>`;
      return;
    }

    container.innerHTML = products.map((p) => ProductView.renderCard(p)).join("");
  }

  const TYPE_ICONS = {
    all: "bi-grid-3x3-gap",
    Apple: "bi-apple",
    Samsung: "bi-phone",
    OPPO: "bi-phone-flip",
    Xiaomi: "bi-phone-landscape",
    Vivo: "bi-phone-vibrate",
    Google: "bi-google",
  };

  function renderTypeFilter(products) {
    const types = ["all", ...new Set(products.map((p) => p.type))];
    const container = document.getElementById("category-filter");
    if (!container) return;

    container.innerHTML = types
      .map((t) => {
        const icon = TYPE_ICONS[t] || "bi-phone";
        const label = t === "all" ? "Tất cả" : t;
        return `<button type="button" class="cat-btn ${t === currentType ? "active" : ""}" data-type="${t}">
          <i class="bi ${icon}"></i>
          <span>${label}</span>
        </button>`;
      })
      .join("");
  }

  function filterProducts() {
    let filtered = allProducts;
    if (currentType !== "all") {
      filtered = filtered.filter((p) => p.type === currentType);
    }
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(kw) ||
          p.type.toLowerCase().includes(kw)
      );
    }
    renderProductList(filtered);
  }

  function bindEvents() {
    document.getElementById("category-filter")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-type]");
      if (!btn) return;
      currentType = btn.dataset.type;
      renderTypeFilter(allProducts);
      filterProducts();
    });

    document.getElementById("search-input")?.addEventListener("input", (e) => {
      searchKeyword = e.target.value;
      filterProducts();
    });

    document.getElementById("product-list")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add-cart]");
      if (!btn) return;
      const product = ProductService.getById(btn.dataset.addCart);
      if (product) {
        CartService.addToCart(product);
        refreshOffcanvas();
        showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
      }
    });
  }

  function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (badge) badge.textContent = CartService.getTotalItems();
  }

  function refreshOffcanvas() {
    const cart = CartService.getCart();
    CartOffcanvasView.render(cart.mangGioHang, cart.tinhTongTien());
    updateCartBadge();
  }

  function bindOffcanvasEvents() {
    const listEl = document.getElementById("oc-list");
    if (!listEl) return;

    listEl.addEventListener("click", (e) => {
      const removeBtn = e.target.closest("[data-oc-remove]");
      if (removeBtn) {
        CartService.removeFromCart(removeBtn.dataset.ocRemove);
        refreshOffcanvas();
        return;
      }

      const plusBtn = e.target.closest("[data-oc-plus]");
      if (plusBtn) {
        const id = Number(plusBtn.dataset.ocPlus);
        const item = CartService.getCart().mangGioHang.find((i) => i.id === id);
        if (item) {
          CartService.updateQuantity(id, item.quality + 1);
          refreshOffcanvas();
        }
        return;
      }

      const minusBtn = e.target.closest("[data-oc-minus]");
      if (minusBtn) {
        const id = Number(minusBtn.dataset.ocMinus);
        const item = CartService.getCart().mangGioHang.find((i) => i.id === id);
        if (item) {
          CartService.updateQuantity(id, item.quality - 1);
          refreshOffcanvas();
        }
      }
    });

  }

  function showToast(message) {
    const toast = document.getElementById("toast-message");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  return { init };
})();
