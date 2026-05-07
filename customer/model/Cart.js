// Cart chứa nhiều CartItem (quan hệ 1 - 0..n)
class Cart {
  constructor() {
    this.mangGioHang = [];
  }

  themGH(sp) {
    const viTri = this.timViTri(sp.id);
    if (viTri !== -1) {
      this.mangGioHang[viTri].quality += 1;
    } else {
      this.mangGioHang.push(new CartItem(sp));
    }
  }

  timViTri(id) {
    return this.mangGioHang.findIndex((item) => item.id === id);
  }

  xoaGH(id) {
    const viTri = this.timViTri(id);
    if (viTri !== -1) {
      this.mangGioHang.splice(viTri, 1);
    }
  }

  capNhatSoLuong(id, soLuong) {
    const viTri = this.timViTri(id);
    if (viTri !== -1) {
      if (soLuong <= 0) {
        this.xoaGH(id);
      } else {
        this.mangGioHang[viTri].quality = soLuong;
      }
    }
  }

  tinhTongTien() {
    return this.mangGioHang.reduce(
      (tong, item) => tong + item.price * item.quality,
      0
    );
  }

  demSoLuong() {
    return this.mangGioHang.reduce((tong, item) => tong + item.quality, 0);
  }
}
