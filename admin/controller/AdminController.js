const AdminController = (() => {
  let _allProducts = [];
  let _deleteTargetId = null;
  let _productModal = null;
  let _deleteModal = null;
  let _searchVal = "";
  let _typeFilter = "";

  function init() {
    ProductService.init().then(() => {
      _allProducts = ProductService.getAll();
      _render();
      AdminView.bindImgPreview();
      _bindEvents();
    });
  }

  function _render() {
    const filtered = _filtered();
    AdminView.renderStats(_allProducts);
    AdminView.renderTable(filtered);
  }

  function _filtered() {
    return _allProducts.filter((p) => {
      const matchName = p.name.toLowerCase().includes(_searchVal.toLowerCase());
      const matchType = _typeFilter === "" || p.type === _typeFilter;
      return matchName && matchType;
    });
  }

  function _bindEvents() {
    _productModal = new bootstrap.Modal(document.getElementById("productModal"));
    _deleteModal  = new bootstrap.Modal(document.getElementById("deleteModal"));

    document.getElementById("productModal").addEventListener("hidden.bs.modal", () => {
      AdminView.clearForm();
    });

    // Open Add modal
    document.getElementById("btn-open-add").addEventListener("click", () => {
      document.getElementById("productModalLabel").textContent = "Thêm sản phẩm mới";
      AdminView.clearForm();
      _productModal.show();
    });

    // Save (Add or Edit)
    document.getElementById("btn-save-product").addEventListener("click", () => {
      if (!AdminView.validateForm()) return;
      const data = AdminView.readForm();
      if (data.id) {
        _updateProduct(data);
      } else {
        _addProduct(data);
      }
      _productModal.hide();
    });

    // Table: Edit / Delete buttons (event delegation)
    document.getElementById("admin-product-tbody").addEventListener("click", (e) => {
      const editBtn = e.target.closest("[data-edit]");
      const deleteBtn = e.target.closest("[data-delete]");

      if (editBtn) {
        const id = Number(editBtn.dataset.edit);
        const product = _allProducts.find((p) => p.id === id);
        if (!product) return;
        document.getElementById("productModalLabel").textContent = "Chỉnh sửa sản phẩm";
        AdminView.fillForm(product);
        _productModal.show();
      }

      if (deleteBtn) {
        _deleteTargetId = Number(deleteBtn.dataset.delete);
        document.getElementById("delete-product-name").textContent = deleteBtn.dataset.name;
        _deleteModal.show();
      }
    });

    // Confirm delete
    document.getElementById("btn-confirm-delete").addEventListener("click", () => {
      if (_deleteTargetId === null) return;
      _deleteProduct(_deleteTargetId);
      _deleteModal.hide();
      _deleteTargetId = null;
    });

    // Search
    document.getElementById("admin-search").addEventListener("input", (e) => {
      _searchVal = e.target.value;
      AdminView.renderTable(_filtered());
    });

    // Type filter
    document.getElementById("admin-type-filter").addEventListener("change", (e) => {
      _typeFilter = e.target.value;
      AdminView.renderTable(_filtered());
    });

    // Reset data
    document.getElementById("btn-reset-data").addEventListener("click", () => {
      if (!confirm("Reset sẽ xóa toàn bộ dữ liệu hiện tại và tải lại từ data-backup.json. Tiếp tục?")) return;
      localStorage.removeItem("phone_shop_products");
      localStorage.removeItem("phone_shop_data_version");
      ProductService.init().then(() => {
        _allProducts = ProductService.getAll();
        _render();
        AdminView.showToast("Đã reset dữ liệu gốc thành công.");
      });
    });
  }

  function _addProduct(data) {
    const products = ProductService.getAll();
    const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
    const newProduct = new Product({ ...data, id: maxId + 1 });
    products.push(newProduct);
    ProductService.saveAll(products);
    _allProducts = products;
    _render();
    AdminView.showToast(`Đã thêm "${newProduct.name}" thành công.`);
  }

  function _updateProduct(data) {
    const products = ProductService.getAll();
    const idx = products.findIndex((p) => p.id === data.id);
    if (idx === -1) return;
    products[idx] = new Product(data);
    ProductService.saveAll(products);
    _allProducts = products;
    _render();
    AdminView.showToast(`Đã cập nhật "${data.name}" thành công.`);
  }

  function _deleteProduct(id) {
    const products = ProductService.getAll().filter((p) => p.id !== id);
    ProductService.saveAll(products);
    _allProducts = products;
    _render();
    AdminView.showToast("Đã xóa sản phẩm.");
  }

  return { init };
})();
