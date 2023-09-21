const productsContainer = [
  {
    id: 1,
    name: "espresso",
    price: 950,
    cardImg: "/assets/productosImg/espresso.jpg",
    category: "caliente",
  },
  {
    id: 2,
    name: "macchiato",
    price: 950,
    cardImg: "/assets/productosImg/cafe-macchiato.jpg",
    category: "caliente",
  },
  {
    id: 3,
    name: "ristretto",
    price: 780,
    cardImg: "/assets/productosImg/cafe-ristretto.jpg",
    category: "caliente",
  },
  {
    id: 4,
    name: "americano",
    price: 950,
    cardImg: "/assets/productosImg/americano.jpg",
    category: "caliente",
  },
  {
    id: 5,
    name: "capuccino",
    price: 950,
    cardImg: "/assets/productosImg/cafe-capuccino.jpg",
    category: "caliente",
  },
  {
    id: 6,
    name: "chocolatada",
    price: 950,
    cardImg: "/assets/productosImg/chocolatada.jpg",
    category: "caliente",
  },
  {
    id: 7,
    name: "flat white",
    price: 950,
    cardImg: "/assets/productosImg/flat-white.jpg",
    category: "caliente",
  },
  {
    id: 8,
    name: "cafe latte",
    price: 950,
    cardImg: "/assets/productosImg/cafe-latte.jpg",
    category: "caliente",
  },
  /*ESPECIALES*/
  {
    id: 9,
    name: "caramel latte",
    price: 1050,
    cardImg: "/assets/productosImg/caramel-latte.jpg",
    category: "especiales",
  },
  {
    id: 10,
    name: "cafe moka latte",
    price: 1050,
    cardImg:"/assets/productosImg/mocka-latte.jpg",
    category: "especiales",
  },
  {
    id: 11,
    name: "vainilla latte",
    price: 1050,
    cardImg:"/assets/productosImg/vanilla-latte.jpg",
    category: "especiales",
  },
  {
    id: 12,
    name: "submarino bruncheria",
    price: 1050,
    cardImg: "/assets/productosImg/submarino-latte.jpg",
    category: "especiales",
  },
  /*BLENDS DE TE*/
  {
    id: 13,
    name: "carmin",
    price: 950,
    cardImg: "/assets/productosImg/carmin.jpg",
    category: "te",
  },

  {
    id: 14,
    name: "otoño",
    price: 950,
    cardImg: "/assets/productosImg/te-negro.jpg",
    category: "te",
  },
  {
    id: 15,
    name: "brisa",
    price: 950,
    cardImg: "/assets/productosImg/brisa.jpg",
    category: "te",
  },
  {
    id: 16,
    name: "calma",
    price: 950,
    cardImg: "/assets/productosImg/calma.jpg",
    category: "te",
  },
  {
    id: 17,
    name: "te clasico",
    price: 780,
    cardImg: "/assets/productosImg/te-clasico.jpg",
    category: "te",
  },
  /*CAFES FRIOS*/
  {
    id: 18,
    name: "espresso tonic",
    price: 950,
    cardImg: "/assets/productosImg/espresso-tonic.jpg",
    category: "frios",
  },
  {
    id: 19,
    name: "dulce de leche latte",
    price: 1050,
    cardImg: "/assets/productosImg/ddl-latte.jpg",
    category: "frios",
  },
  /*REFRESCOS*/
  {
    id: 20,
    name: "limonada clasica",
    price: 2000,
    cardImg: "/assets/productosImg/limonada.jpg",
    category: "refrescos",
  },
  {
    id: 21,
    name: "limonada rosa",
    price: 2000,
    cardImg: "/assets/productosImg/limonada-rosa.jpg",
    category: "refrescos",
  },
  {
    id: 22,
    name: "jugo de naranja",
    price: 1300,
    cardImg: "/assets/productosImg/jugo-naranja.jpg",
    category: "refrescos",
  },
  /*SPRITZERIA*/
  {
    id: 23,
    name: "aperol spritz",
    price: 1850,
    cardImg: "/assets/productosImg/aperol-spritzs.jpg",
    category: "spritz",
  },
  {
    id: 24,
    name: "citrus spritz",
    price: 1950,
    cardImg: "/assets/productosImg/aperol-citrus.jpg",
    category: "spritz",
  },
  {
    id: 25,
    name: "sangria spritz",
    price: 1950,
    cardImg: "/assets/productosImg/sangria.jpg",
    category: "spritz",
  },
];

const divideProductsInParts = (size) => {
  let productList = [];
  for (let i = 0; i < productsContainer.length; i += size) {
    productList.push(productsContainer.slice(i, i + size));
  }
  return productList;
};

const appState = {
  products: divideProductsInParts(6),
  currentIndexProducts: 0,
  productsLimit: divideProductsInParts(6).length,
  activeFilter: null,
};
