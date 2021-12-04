import { OrderItem } from "./order-item";

export interface Order {
  items: OrderItem[];
  amountPaid?: number;
  cashOrBank?: 'cash' | 'bank';
  isPaid?: boolean;
  vatPrice: number;
  totalPrice: number;
}
