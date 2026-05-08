class Product {
  constructor({ id, name, price, screen, blackCamera, frontCamera, img, desc, type,
                videoId, chip, battery, os, storage, weight, features }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.blackCamera = blackCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.videoId = videoId || "";
    this.chip = chip || "";
    this.battery = battery || "";
    this.os = os || "";
    this.storage = storage || "";
    this.weight = weight || "";
    this.features = features || [];
  }

  formatPrice() {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(this.price);
  }
}
