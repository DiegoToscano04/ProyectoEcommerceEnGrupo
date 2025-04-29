// src/app/cart.service.ts
import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { CartItem } from './models/cart-item.model';

// Datos Mock iniciales (los moveremos aquí temporalmente)
const INITIAL_MOCK_CART: CartItem[] = [
  { id: 1, name: 'Camiseta', price: 59000, quantity: 2, image: 'assets/images/camiseta.jpg' },
  { id: 2, name: 'Jeans', price: 129000, quantity: 1, image: 'assets/images/jeans.jpg' },
];

@Injectable({
  providedIn: 'root' // Singleton en toda la aplicación
})
export class CartService {

  // --- Estado del Carrito (Signals Privados y Públicos) ---

  // WritableSignal: La fuente interna de verdad, puede ser modificada DENTRO del servicio
  #cartItems: WritableSignal<CartItem[]> = signal<CartItem[]>(INITIAL_MOCK_CART);

  // Signal (Readonly): Exposición pública del estado del carrito. Los componentes lo leerán.
  public readonly cartItems: Signal<CartItem[]> = this.#cartItems.asReadonly();

  // --- Estado Derivado (Computed Signals) ---

  // Calcula el número total de ítems en el carrito
  public readonly totalItems = computed(() => {
    return this.#cartItems().reduce((acc, item) => acc + item.quantity, 0);
  });

  // Calcula el precio total del carrito
  public readonly totalPrice = computed(() => {
    return this.#cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0);
  });

  // Indica si el carrito está vacío
  public readonly isEmpty = computed(() => this.#cartItems().length === 0);

  // --- Métodos para Modificar el Carrito ---

  // Añadir un producto (ejemplo básico, necesitarás lógica para agrupar)
  // addItem(product: Product, quantity: number = 1) { // Suponiendo que tienes un modelo Product
  //   this.#cartItems.update(items => {
  //     const existingItem = items.find(item => item.id === product.id); // O productId
  //     if (existingItem) {
  //       // Actualizar cantidad si ya existe
  //       return items.map(item =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + quantity }
  //           : item
  //       );
  //     } else {
  //       // Añadir nuevo item
  //       const newItem: CartItem = { /* ... crear CartItem desde Product ... */ };
  //       return [...items, newItem];
  //     }
  //   });
  // }

  // Eliminar un ítem del carrito por su ID
  removeItem(itemId: number): void {
    this.#cartItems.update(items => items.filter(item => item.id !== itemId));
  }

  // Actualizar la cantidad de un ítem específico
  updateQuantity(itemId: number, newQuantity: number): void {
    // Asegurarse de que la cantidad no sea menor que 1
    const quantity = Math.max(1, newQuantity);

    this.#cartItems.update(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: quantity } // Actualizar cantidad
          : item
      )
    );
  }

  // Incrementar cantidad (convenience method)
  incrementQuantity(itemId: number): void {
    this.#cartItems.update(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrementar cantidad (convenience method, asegura mínimo 1)
  decrementQuantity(itemId: number): void {
    this.#cartItems.update(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Asegura que no baje de 1
          : item
      )
    );
    // Opcional: si quieres eliminar si llega a 0 (depende de la UX deseada)
    // const currentItem = this.#cartItems().find(i => i.id === itemId);
    // if (currentItem && currentItem.quantity === 1) {
    //   // Si al decrementar llega a 0, quizás quieras llamar a removeItem
    //   // this.removeItem(itemId);
    // } else { /* ... código de arriba para decrementar */}
  }


  // Vaciar completamente el carrito
  clearCart(): void {
    this.#cartItems.set([]); // Establece el array a vacío
  }
}