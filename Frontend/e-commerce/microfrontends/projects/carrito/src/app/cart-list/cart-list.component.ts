// cart-list.component.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core'; // Añadir ChangeDetectionStrategy
import { CommonModule, CurrencyPipe } from '@angular/common'; // Añadir CurrencyPipe si no está
import { CartItem } from '../models/cart-item.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], // Asegurar CurrencyPipe
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // ¡Importante con Signals!
})
export class CartListComponent {
  public cartService = inject(CartService);

  increment(item: CartItem): void {
    this.cartService.incrementQuantity(item.id);
  }

  decrement(item: CartItem): void {
    // La lógica de no bajar de 1 ya está en el servicio (o en el botón [disabled])
    this.cartService.decrementQuantity(item.id);
  }

  remove(item: CartItem): void {
    this.cartService.removeItem(item.id);
  }

  // trackBy para mejorar rendimiento del *ngFor
  trackById(index: number, item: CartItem): number {
    return item.id;
  }
}