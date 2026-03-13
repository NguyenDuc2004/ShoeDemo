import { Shoe, User, Order } from './types';

export const mockShoes: Shoe[] = [
  { id: '1', name: 'Air Max 270', brand: 'Nike', price: 150, stock: 45, category: 'Running', image: 'https://picsum.photos/seed/nike1/400/400' },
  { id: '2', name: 'Ultraboost 22', brand: 'Adidas', price: 180, stock: 32, category: 'Running', image: 'https://picsum.photos/seed/adidas1/400/400' },
  { id: '3', name: 'Classic Leather', brand: 'Reebok', price: 85, stock: 60, category: 'Lifestyle', image: 'https://picsum.photos/seed/reebok1/400/400' },
  { id: '4', name: 'Old Skool', brand: 'Vans', price: 65, stock: 120, category: 'Skate', image: 'https://picsum.photos/seed/vans1/400/400' },
  { id: '5', name: 'Chuck Taylor', brand: 'Converse', price: 60, stock: 85, category: 'Lifestyle', image: 'https://picsum.photos/seed/converse1/400/400' },
];

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', joinedAt: '2023-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', joinedAt: '2023-02-20' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'user', status: 'inactive', joinedAt: '2023-03-10' },
];

export const mockOrders: Order[] = [
  { id: 'ORD-001', userId: '2', userName: 'Jane Smith', total: 330, status: 'delivered', date: '2023-10-01', items: [{ shoeId: '1', quantity: 1, price: 150 }, { shoeId: '2', quantity: 1, price: 180 }] },
  { id: 'ORD-002', userId: '3', userName: 'Bob Wilson', total: 65, status: 'shipped', date: '2023-10-05', items: [{ shoeId: '4', quantity: 1, price: 65 }] },
  { id: 'ORD-003', userId: '2', userName: 'Jane Smith', total: 150, status: 'pending', date: '2023-10-10', items: [{ shoeId: '1', quantity: 1, price: 150 }] },
];

export const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];
