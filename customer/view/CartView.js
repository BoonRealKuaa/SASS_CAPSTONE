const CartView = (() => {
  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }

  function render(mangGioHang, total) {
    const container = document.getElementById("cart-container");
    const totalEl = document.getElementById("cart-total");
    const emptyEl = document.getElementById("cart-empty");
    const summaryEl = document.getElementById("cart-summary");

    if (!container) return;

    const isEmpty = mangGioHang.length === 0;
    container.innerHTML = "";
    if (emptyEl) emptyEl.classList.toggle("d-none", !isEmpty);
    if (summaryEl) summaryEl.classList.toggle("d-none", isEmpty);
    if (isEmpty) return;

    const basePath = window.BASE_PATH || "";
    container.innerHTML = mangGioHang
      .map(
        (item) => `
        <div class="cart-item d-flex align-items-center border-bottom py-3">
          <img src="${basePath + item.img}" alt="${item.name}" style="width:80px;height:80px;object-fit:contain;" class="me-3">
          <div class="flex-grow-1">
            <h6 class="mb-1">${item.name}</h6>
            <p class="text-danger mb-1">${formatPrice(item.price)}</p>
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-outline-secondary btn-sm" data-minus="${item.id}">-</button>
              <span class="fw-bold px-2">${item.quality}</span>
              <button class="btn btn-outline-secondary btn-sm" data-plus="${item.id}">+</button>
            </div>
          </div>
          <div class="text-end ms-3">
            <p class="fw-bold text-danger">${formatPrice(item.price * item.quality)}</p>
            <button class="btn btn-outline-danger btn-sm" data-remove="${item.id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>`
      )
      .join("");

    if (totalEl) totalEl.textContent = formatPrice(total);
  }

  return { render };
})();
