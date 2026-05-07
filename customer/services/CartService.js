const CartService = (() => {
  const STORAGE_KEY = "phone_shop_cart";

  function _loadCart() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const cart = new Cart();
    if (raw) {
      const items = JSON.parse(raw);
      cart.mangGioHang = items.map((item) => Object.assign(new CartItem(item), item));
    }
    return cart;
  }

  function _saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.mangGioHang));
  }

  function getCart() {
    return _loadCart();
  }

  function addToCart(product) {
    const cart = _loadCart();
    cart.themGH(product);
    _saveCart(cart);
    return cart;
  }

  function removeFromCart(id) {
    const cart = _loadCart();
    cart.xoaGH(Number(id));
    _saveCart(cart);
    return cart;
  }

  function updateQuantity(id, soLuong) {
    const cart = _loadCart();
    cart.capNhatSoLuong(Number(id), soLuong);
    _saveCart(cart);
    return cart;
  }

  function clearCart() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function getTotal() {
    return _loadCart().tinhTongTien();
  }

  function getTotalItems() {
    return _loadCart().demSoLuong();
  }

  return { getCart, addToCart, removeFromCart, updateQuantity, clearCart, getTotal, getTotalItems };
})();
