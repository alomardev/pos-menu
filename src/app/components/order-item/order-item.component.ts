import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { OrderItem } from '../../models/order-item';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {

  @HostBinding('class.order-item') orderItemClassName = true;
  @Input() item!: OrderItem;
  @Output() update = new EventEmitter<OrderItem>();
  @Output() delete = new EventEmitter<OrderItem>();

  constructor() { }

  resolveInvalidImage(event: ErrorEvent) {
    (event.target as HTMLElement).style.display = 'none';
  }

  onQuantityChange(quantity: number) {
    this.item.quantity = quantity;
    this.update.emit(this.item);
  }

  onDelete() {
    this.delete.emit(this.item);
  }

}
