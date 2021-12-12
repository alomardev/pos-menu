import type { Product } from './app/models/product';
import type { Order } from './app/models/order';
import type { Invoice } from './app/models/invoice';

declare global {
  function getConfigs(): Promise<{ vatRate: number, vatNumber: string, ordersListUrl: string }>;
  function getProducts(): Promise<Product[]>;
  function submitOrder(order: Order): Promise<Invoice>;
}
