const ProductView = (() => {
  function renderCard(product) {
    return `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="product-card h-100">
          <div class="product-card-img">
            <img src="${product.img}" alt="${product.name}" loading="lazy">
          </div>
          <div class="product-card-body">
            <span class="product-badge">${product.type}</span>
            <p class="product-name">${product.name}</p>
            <p class="product-spec">
              <i class="bi bi-display"></i> ${product.screen}<br>
              <i class="bi bi-camera"></i> ${product.blackCamera}
            </p>
            <p class="product-price">${product.formatPrice()}</p>
            <button type="button" class="btn-add-cart" data-add-cart="${product.id}">
              <i class="bi bi-cart-plus me-1"></i> Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>`;
  }

  return { renderCard };
})();
