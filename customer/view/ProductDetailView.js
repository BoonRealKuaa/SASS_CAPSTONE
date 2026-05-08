const ProductDetailView = (() => {
  const TYPE_COLORS = {
    Apple: "danger",
    Samsung: "primary",
    OPPO: "success",
    Xiaomi: "warning",
  };

  function showNotFound() {
    document.getElementById("detail-not-found").classList.remove("d-none");
  }

  function render(product) {
    document.title = `${product.name} - Phone Shop`;

    document.getElementById("detail-content").classList.remove("d-none");
    document.getElementById("detail-video").src =
      `https://www.youtube.com/embed/${product.videoId}?autoplay=0&rel=0`;
    const basePath = window.BASE_PATH || "";
    document.getElementById("detail-img").src = basePath + product.img;
    document.getElementById("detail-img").alt = product.name;
    document.getElementById("breadcrumb-name").textContent = product.name;

    const color = TYPE_COLORS[product.type] || "secondary";
    const typeBadge = document.getElementById("detail-type");
    typeBadge.textContent = product.type;
    typeBadge.className = `badge bg-${color} detail-type-badge mb-2`;

    document.getElementById("detail-name").textContent = product.name;
    document.getElementById("detail-desc").textContent = product.desc;
    document.getElementById("detail-price").textContent = product.formatPrice();

    _renderSpecsGrid(product);
    _renderFeatures(product.features || []);
    _renderSpecsTable(product);
  }

  function _renderSpecsGrid(product) {
    const specs = [
      { icon: "bi-display", label: "Màn hình", value: product.screen },
      { icon: "bi-cpu", label: "Chip", value: product.chip || "—" },
      { icon: "bi-camera", label: "Camera sau", value: product.blackCamera },
      { icon: "bi-camera2", label: "Camera trước", value: product.frontCamera },
      { icon: "bi-battery-half", label: "Pin", value: product.battery || "—" },
      { icon: "bi-phone", label: "Hệ điều hành", value: product.os || "—" },
    ];

    const container = document.getElementById("detail-specs-grid");
    container.innerHTML = specs
      .map(
        (s) => `
        <div class="detail-spec-card">
          <i class="bi ${s.icon} detail-spec-icon"></i>
          <div>
            <div class="detail-spec-label">${s.label}</div>
            <div class="detail-spec-value">${s.value}</div>
          </div>
        </div>`
      )
      .join("");
  }

  function _renderFeatures(features) {
    if (!features.length) return;
    const container = document.getElementById("detail-features");
    container.innerHTML = `
      <h6 class="fw-bold mb-2">Tính năng nổi bật</h6>
      <ul class="detail-features-list">
        ${features.map((f) => `<li><i class="bi bi-check-circle-fill text-success me-2"></i>${f}</li>`).join("")}
      </ul>`;
  }

  function _renderSpecsTable(product) {
    const rows = [
      ["Màn hình", product.screen],
      ["Chip xử lý", product.chip || "—"],
      ["Camera sau", product.blackCamera],
      ["Camera trước", product.frontCamera],
      ["Dung lượng pin", product.battery || "—"],
      ["Hệ điều hành", product.os || "—"],
      ["Bộ nhớ trong", product.storage || "—"],
      ["Trọng lượng", product.weight || "—"],
      ["Loại máy", product.type],
    ];

    const table = document.getElementById("detail-specs-table");
    table.innerHTML = rows
      .map(
        ([label, value]) =>
          `<tr>
            <th class="w-35 bg-light">${label}</th>
            <td>${value}</td>
          </tr>`
      )
      .join("");
  }

  function updateBadge(count) {
    const badge = document.getElementById("cart-badge-detail");
    if (badge) badge.textContent = count;
  }

  function showToast(msg) {
    const toast = document.getElementById("toast-message");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  return { render, showNotFound, updateBadge, showToast };
})();
