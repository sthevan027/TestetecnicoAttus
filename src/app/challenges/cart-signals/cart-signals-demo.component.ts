import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  output,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

export interface CartItem {
  id: string;
  label: string;
  unitPrice: number;
  qty: number;
}

@Component({
  selector: 'app-cart-signals-demo',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './cart-signals-demo.component.html',
  styleUrl: './cart-signals-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSignalsDemoComponent {
  readonly items = signal<CartItem[]>([
    { id: 'a', label: 'Camiseta', unitPrice: 49.9, qty: 1 },
    { id: 'b', label: 'Caneca', unitPrice: 29.9, qty: 2 },
  ]);

  readonly total = computed(() =>
    this.items().reduce((sum, i) => sum + i.unitPrice * i.qty, 0),
  );

  readonly totalChanged = output<number>();

  constructor() {
    effect(() => {
      this.totalChanged.emit(this.total());
    });
  }

  addSample(): void {
    const next: CartItem = {
      id: crypto.randomUUID(),
      label: 'Item extra',
      unitPrice: 15,
      qty: 1,
    };
    this.items.update((list) => [...list, next]);
  }

  removeLast(): void {
    this.items.update((list) => list.slice(0, -1));
  }
}
