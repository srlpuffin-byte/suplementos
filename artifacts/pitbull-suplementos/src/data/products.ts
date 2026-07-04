export interface Product {
  id: string;
  name: string;
  originalPrice?: number;
  price: number;
  discountBadge?: string;
  imageUrl?: string;
  category: string;
  flavor?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "ON Amino Energy Lata 355ml",
    originalPrice: 6401.70,
    price: 4033.07,
    discountBadge: "-37% OFF",
    category: "EEAs & BCAAs",
    flavor: "Frutilla"
  },
  {
    id: "2",
    name: "Cafeína Star Nutrition 30 cápsulas",
    originalPrice: 11440.44,
    price: 8580.33,
    discountBadge: "-25% OFF",
    category: "Pre Entreno",
    flavor: "S/Sabor"
  },
  {
    id: "3",
    name: "Quemador Ripped X ENA (60Caps) 30 Servicios",
    originalPrice: 14271.13,
    price: 10703.35,
    discountBadge: "-25% OFF",
    category: "Quemador",
    flavor: "S/Sabor"
  },
  {
    id: "4",
    name: "Quemador Hydroxy Max Night ENA (120Caps) 30 Servicios",
    originalPrice: 14712.50,
    price: 11034.37,
    discountBadge: "-25% OFF",
    category: "Quemador",
    flavor: "S/Sabor"
  },
  {
    id: "5",
    name: "ZMA Ena 60 Cápsulas",
    price: 11586.10,
    discountBadge: "-25% OFF",
    category: "Bienestar",
    flavor: "S/Sabor"
  },
  {
    id: "6",
    name: "Quemador Hydroxi Max Black ENA (120Caps)",
    price: 12468.85,
    discountBadge: "-25% OFF",
    category: "Quemador",
    flavor: "S/Sabor"
  },
  {
    id: "7",
    name: "Race Gel Mervick 40 gr 12 unidades",
    price: 12638.63,
    discountBadge: "-30% OFF",
    category: "Pre Entreno",
    flavor: "Multifruta"
  },
  {
    id: "8",
    name: "Carnitina 1500 ENA (60Caps)",
    price: 13572.28,
    discountBadge: "-25% OFF",
    category: "Quemador",
    flavor: "S/Sabor"
  },
  {
    id: "9",
    name: "Whey Protein ENA TrueMade 1kg",
    price: 32000.00,
    category: "Proteína",
    flavor: "Chocolate"
  },
  {
    id: "10",
    name: "Creatina Monohidrato Star Nutrition 300g",
    price: 25000.00,
    originalPrice: 28000.00,
    discountBadge: "-10% OFF",
    category: "Creatina",
    flavor: "S/Sabor"
  },
  {
    id: "11",
    name: "Pre Entreno Pump 3D 300g",
    price: 18500.00,
    category: "Pre Entreno",
    flavor: "Blue Raz"
  },
  {
    id: "12",
    name: "BCAA 2:1:1 Star Nutrition",
    price: 21000.00,
    category: "EEAs & BCAAs",
    flavor: "Acai"
  },
  {
    id: "13",
    name: "Proteína Best Whey 1kg",
    price: 29500.00,
    category: "Proteína",
    flavor: "Vainilla"
  },
  {
    id: "14",
    name: "Combo Definición: Quemador + Carnitina",
    price: 22000.00,
    originalPrice: 26041.13,
    discountBadge: "-15% OFF",
    category: "Combos",
    flavor: "S/Sabor"
  },
  {
    id: "15",
    name: "Whey Protein Advanced 1kg",
    price: 35000.00,
    category: "Proteína",
    flavor: "Frutilla"
  },
  {
    id: "16",
    name: "Multivitamínico Universal 60 tabs",
    price: 15000.00,
    category: "Bienestar",
    flavor: "S/Sabor"
  }
];

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
};
