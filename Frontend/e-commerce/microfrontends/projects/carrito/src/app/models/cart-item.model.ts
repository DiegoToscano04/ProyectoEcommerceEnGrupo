// src/app/models/cart-item.model.ts
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string; // Añadido como opcional
  size?: string | number; // Añadido como opcional (puede ser string o número)
  // Agrega aquí cualquier otra propiedad que venga del producto original
  // productId?: number | string; // Por ejemplo, el ID original del producto
}