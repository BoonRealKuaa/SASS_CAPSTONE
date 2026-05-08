const CartOffcanvasView = (() => {
  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }

  function render(mangGioHang, tongTien) {
    const listEl    = document.getElementById("oc-list");
    const emptyEl   = document.getElementById("oc-empty");
    const footerEl  = document.getElementById("oc-footer");
    const totalQty  = document.getElementById("oc-total-qty");
    const totalPrice = document.getElementById("oc-total-price");

    if (!listEl) return;

    const isEmpty = mangGioHang.length === 0;

    emptyEl.classList.toggle("d-none", !isEmpty);
    listEl.classList.toggle("d-none", isEmpty);
    footerEl.classList.toggle("d-none", isEmpty);

    if (isEmpty) return;

    const basePath = window.BASE_PATH || "";
    listEl.innerHTML = mangGioHang
      .map(
        (item) => `
        <div class="oc-item">
          <img src="${basePath + item.img}" alt="${item.name}">
          <div class="oc-item-info">
            <p class="oc-item-name">${item.name}</p>
            <p class="oc-item-price">${formatPrice(item.price)}</p>
            <div class="oc-qty-control">
              <button type="button" class="oc-qty-btn" data-oc-minus="${item.id}" title="Giảm">-</button>
              <span class="oc-qty-num">${item.quality}</span>
              <button type="button" class="oc-qty-btn" data-oc-plus="${item.id}" title="Tăng">+</button>
            </div>
          </div>
          <button type="button" class="oc-remove" data-oc-remove="${item.id}" title="Xóa">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>`
      )
      .join("");

    const soLuong = mangGioHang.reduce((t, i) => t + i.quality, 0);
    totalQty.textContent = soLuong;
    totalPrice.textContent = formatPrice(tongTien);
  }

  return { render };
})();
