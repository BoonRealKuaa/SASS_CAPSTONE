const ProductService = (() => {
  const STORAGE_KEY = "phone_shop_products";

  function getAll() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw).map((p) => new Product(p));
  }

  function getById(id) {
    return getAll().find((p) => p.id === Number(id)) || null;
  }

  function saveAll(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  async function init() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const basePath = window.BASE_PATH || "";
      const res = await fetch(basePath + "data-backup.json");
      const data = await res.json();

      // Gắn base path vào đường dẫn ảnh để dùng đúng từ mọi trang
      const products = data.products.map((p) => ({
        ...p,
        img: basePath + p.img,
      }));
      saveAll(products);
    }
  }

  return { getAll, getById, saveAll, init };
})();
