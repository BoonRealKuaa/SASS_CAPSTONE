const AdminView = (() => {
  const TYPE_COLORS = {
    Apple: "danger",
    Samsung: "primary",
    OPPO: "success",
    Xiaomi: "warning",
  };

  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
  }

  function renderStats(products) {
    const total = products.length;
    const totalValue = products.reduce((s, p) => s + p.price, 0);
    const byType = products.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {});
    const topType = Object.entries(byType).sort((a, b) => b[1] - a[1])[0];

    const container = document.getElementById("admin-stats");
    if (!container) return;
    container.innerHTML = `
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-icon bg-danger-subtle text-danger"><i class="bi bi-box-seam"></i></div>
          <div>
            <div class="stat-value">${total}</div>
            <div class="stat-label">Tổng sản phẩm</div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-icon bg-primary-subtle text-primary"><i class="bi bi-currency-dollar"></i></div>
          <div>
            <div class="stat-value" style="font-size:1rem;">${formatPrice(totalValue)}</div>
            <div class="stat-label">Tổng giá trị kho</div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-icon bg-success-subtle text-success"><i class="bi bi-tags"></i></div>
          <div>
            <div class="stat-value">${Object.keys(byType).length}</div>
            <div class="stat-label">Số hãng</div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-icon bg-warning-subtle text-warning"><i class="bi bi-trophy"></i></div>
          <div>
            <div class="stat-value">${topType ? topType[0] : "—"}</div>
            <div class="stat-label">Hãng nhiều nhất (${topType ? topType[1] : 0} sp)</div>
          </div>
        </div>
      </div>`;
  }

  function renderTable(products) {
    const tbody = document.getElementById("admin-product-tbody");
    const emptyEl = document.getElementById("admin-empty");
    if (!tbody) return;

    const basePath = window.BASE_PATH || "";

    if (products.length === 0) {
      tbody.innerHTML = "";
      if (emptyEl) emptyEl.classList.remove("d-none");
      return;
    }
    if (emptyEl) emptyEl.classList.add("d-none");

    tbody.innerHTML = products
      .map((p) => {
        const color = TYPE_COLORS[p.type] || "secondary";
        return `
          <tr>
            <td class="text-muted fw-bold">#${p.id}</td>
            <td>
              <img src="${basePath + p.img}" alt="${p.name}" class="admin-thumb" onerror="this.src='${basePath}asset/img/placeholder.png'">
            </td>
            <td>
              <div class="fw-semibold">${p.name}</div>
              <div class="text-muted small">${p.desc}</div>
            </td>
            <td><span class="badge bg-${color}">${p.type}</span></td>
            <td class="text-danger fw-bold">${formatPrice(p.price)}</td>
            <td class="text-muted small">${p.screen}</td>
            <td class="text-center">
              <button type="button" class="btn btn-sm btn-outline-primary me-1" data-edit="${p.id}" title="Chỉnh sửa">
                <i class="bi bi-pencil"></i>
              </button>
              <button type="button" class="btn btn-sm btn-outline-danger" data-delete="${p.id}" data-name="${p.name}" title="Xóa">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>`;
      })
      .join("");
  }

  function fillForm(product) {
    document.getElementById("form-id").value = product.id;
    document.getElementById("form-name").value = product.name;
    document.getElementById("form-type").value = product.type;
    document.getElementById("form-price").value = product.price;
    document.getElementById("form-chip").value = product.chip || "";
    document.getElementById("form-screen").value = product.screen;
    document.getElementById("form-battery").value = product.battery || "";
    document.getElementById("form-blackCamera").value = product.blackCamera;
    document.getElementById("form-frontCamera").value = product.frontCamera;
    document.getElementById("form-os").value = product.os || "";
    document.getElementById("form-storage").value = product.storage || "";
    document.getElementById("form-weight").value = product.weight || "";
    document.getElementById("form-videoId").value = product.videoId || "";
    document.getElementById("form-desc").value = product.desc;
    document.getElementById("form-features").value = (product.features || []).join("\n");
    document.getElementById("form-img").value = product.img;
    _previewImg(product.img);
  }

  function clearForm() {
    const form = document.getElementById("product-form");
    form.reset();
    form.classList.remove("was-validated");
    document.getElementById("form-id").value = "";
    document.getElementById("img-preview-wrap").style.display = "none";
  }

  function readForm() {
    const id = document.getElementById("form-id").value;
    const features = document.getElementById("form-features").value
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    return {
      id: id ? Number(id) : null,
      name: document.getElementById("form-name").value.trim(),
      type: document.getElementById("form-type").value,
      price: Number(document.getElementById("form-price").value),
      chip: document.getElementById("form-chip").value.trim(),
      screen: document.getElementById("form-screen").value.trim(),
      battery: document.getElementById("form-battery").value.trim(),
      blackCamera: document.getElementById("form-blackCamera").value.trim(),
      frontCamera: document.getElementById("form-frontCamera").value.trim(),
      os: document.getElementById("form-os").value.trim(),
      storage: document.getElementById("form-storage").value.trim(),
      weight: document.getElementById("form-weight").value.trim(),
      videoId: document.getElementById("form-videoId").value.trim(),
      desc: document.getElementById("form-desc").value.trim(),
      features,
      img: document.getElementById("form-img").value.trim(),
    };
  }

  function validateForm() {
    const form = document.getElementById("product-form");
    form.classList.add("was-validated");
    return form.checkValidity();
  }

  function _previewImg(filename) {
    const wrap = document.getElementById("img-preview-wrap");
    const preview = document.getElementById("img-preview");
    if (!filename) { wrap.classList.add("d-none"); return; }
    const basePath = window.BASE_PATH || "";
    preview.src = basePath + "asset/img/phones/" + filename;
    wrap.classList.remove("d-none");
  }

  function bindImgPreview() {
    document.getElementById("form-img").addEventListener("input", (e) => {
      _previewImg(e.target.value.trim());
    });
  }

  function showToast(msg, isError = false) {
    const toast = document.getElementById("toast-message");
    if (!toast) return;
    toast.textContent = msg;
    toast.className = "toast-custom show" + (isError ? " toast-error" : "");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  return { renderStats, renderTable, fillForm, clearForm, readForm, validateForm, bindImgPreview, showToast };
})();
