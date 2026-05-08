const ProductView = (() => {
  function renderCard(product) {
    const basePath = window.BASE_PATH || "";
    const detailUrl = `${basePath}customer/view/product-detail.html?id=${product.id}`;
    const imgSrc = basePath + product.img;
    return `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="product-card h-100">
          <a href="${detailUrl}" class="product-card-link" title="Xem chi tiết ${product.name}">
            <div class="product-card-img">
              <img src="${imgSrc}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-card-body">
              <span class="product-badge">${product.type}</span>
              <p class="product-name">${product.name}</p>
              <p class="product-spec">
                <i class="bi bi-display"></i> ${product.screen}<br>
                <i class="bi bi-camera"></i> ${product.blackCamera}
              </p>
              <p class="product-price">${product.formatPrice()}</p>
            </div>
          </a>
          <div class="product-card-footer">
            <button type="button" class="btn-add-cart" data-add-cart="${product.id}">
              <i class="bi bi-cart-plus me-1"></i> Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>`;
  }

  return { renderCard };
})();
