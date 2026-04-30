// ===================== USERS =====================
export const users = [
  {
    id: "user_1",
    name: "Raphael Store Owner",
    email: "raphael@dart.com"
  }
];

// ===================== STORES =====================
export const stores = [
  {
    id: "store_1",
    ownerId: "user_1",
    name: "Tech Haven",
    slug: "tech-haven",
    description: "Premium gadgets and electronics for modern lifestyle",
    createdAt: "2026-01-01"
  },
  {
    id: "store_2",
    ownerId: "user_1",
    name: "Fashion Hub",
    slug: "fashion-hub",
    description: "Trendy fashion for all seasons",
    createdAt: "2026-01-05"
  }
];

// ===================== PRODUCTS =====================
export const products = [
  // Tech Haven products
  {
    id: "prod_1",
    storeId: "store_1",
    name: "iPhone 15 Pro",
    price: 1200,
    description: "Latest Apple flagship smartphone",
    image: "",
    stock: 8,
    category: "Electronics",
    rating: 4.8
  },
  {
    id: "prod_2",
    storeId: "store_1",
    name: "MacBook Air M3",
    price: 1500,
    description: "Lightweight performance laptop",
    image: "",
    stock: 5,
    category: "Computers",
    rating: 4.9
  },
  {
    id: "prod_3",
    storeId: "store_1",
    name: "AirPods Pro",
    price: 250,
    description: "Noise cancelling wireless earbuds",
    image: "",
    stock: 20,
    category: "Accessories",
    rating: 4.7
  },

  // Fashion Hub products
  {
    id: "prod_4",
    storeId: "store_2",
    name: "Nike Air Force 1",
    price: 120,
    description: "Classic white sneakers",
    image: "",
    stock: 30,
    category: "Shoes",
    rating: 4.6
  },
  {
    id: "prod_5",
    storeId: "store_2",
    name: "Gucci T-Shirt",
    price: 450,
    description: "Luxury designer t-shirt",
    image: "",
    stock: 10,
    category: "Clothing",
    rating: 4.5
  },
  {
    id: "prod_6",
    storeId: "store_2",
    name: "Zara Jacket",
    price: 90,
    description: "Stylish winter jacket",
    image: "",
    stock: 15,
    category: "Clothing",
    rating: 4.3
  }
];