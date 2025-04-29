// src/app/app.component.ts
import { Component, inject } from '@angular/core'; // Import inject
import { RouterOutlet } from '@angular/router';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CartEmptyComponent } from './cart-empty/cart-empty.component';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service'; // Importar el servicio

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            CommonModule,
           CartListComponent,
           CartSummaryComponent,
           CartEmptyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Inyectar el servicio
  public cartService = inject(CartService);

  // Ya no necesitamos cartItems local aquí
  // cartItems: CartItem[] = [ ... ];
}