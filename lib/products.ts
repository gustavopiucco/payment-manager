export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Gaming Laptop",
    price: 900,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnR44rEmpPT4QmamZNeYNM_sZzDOQn4gIntA&s",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 450,
    image: "https://thumbs.dreamstime.com/b/smartphone-realistico-nuovissimo-del-nero-telefono-cellulare-iphone-di-apple-100341904.jpg",
  },
  {
    id: 3,
    name: "Headset",
    price: 70,
    image: "https://www.wireshop.it/7653388-thickbox_default/hp-bluetooth-headset-500.jpg",
  },
  {
    id: 4,
    name: "Tablet",
    price: 240,
    image: "https://aws-obg-image-lb-2.tcl.com/content/dam/brandsite/region/global/products/tablets/tcl-nxtpaper-14/id/1.png?t=1721272443153&w=800&webp=true&dpr=2.625&rendition=1068",
  },
  {
    id: 5,
    name: "Smartwatch",
    price: 160,
    image: "https://i5.walmartimages.com/seo/Smart-Watch-Fits-for-Android-and-iPhone-EEEkit-Fitness-Health-Tracker-Waterproof-Smartwatch-for-Women-Men_819cb65b-8437-4eb3-aba1-ce6513dc8d58.312f5775b50ab18c130fe5a454149fa9.jpeg",
  },
  {
    id: 6,
    name: "Camera",
    price: 300,
    image: "https://gppro.in/wp-content/uploads/2024/11/DSC-RX10M4-IN5_1.jpg",
  },
  {
    id: 7,
    name: "Printer",
    price: 120,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUWqYAnhx5MqDo-yhHkYZzpgpL9tBg1UMYXg&s",
  },
  {
    id: 8,
    name: "Monitor",
    price: 180,
    image: "https://m.media-amazon.com/images/I/710q+sSccwL._UF1000,1000_QL80_.jpg",
  },
];

export default products;
