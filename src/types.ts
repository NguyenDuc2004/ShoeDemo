export interface Shoe {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  joinedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  items: { shoeId: string; quantity: number; price: number }[];
}

export type View = 'dashboard' | 'shoes' | 'users' | 'orders';
