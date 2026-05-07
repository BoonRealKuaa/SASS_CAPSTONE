// CartItem mẫu 1: chỉ lưu các thuộc tính cần thiết cho giỏ hàng
class CartItem {
  constructor({ id, name, price, img }, quality = 1) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.img = img;
    this.quality = quality;
  }
}
