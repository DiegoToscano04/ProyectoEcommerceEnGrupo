// src/app/cart-summary/cart-summary.component.ts
import { Component, inject } from '@angular/core'; // Import inject
import { CommonModule, CurrencyPipe } from '@angular/common';
// Ya no necesitamos CartItem aquí si no lo usamos directamente
// import { CartItem } from '../models/cart-item.model';
import { CartService } from '../cart.service'; // Importar servicio

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss'
})
export class CartSummaryComponent {
  // Ya NO necesitamos el Input
  // @Input() cartItems: CartItem[] = [];

  // Inyectar el servicio
  public cartService = inject(CartService);

  // Ya no necesitamos estos métodos, usaremos los computed signals del servicio
  // getTotalItems(): number { ... }
  // getTotal(): number { ... }
}