import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../models/invoice';
import { Order } from '../models/order';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  invoices$ = new BehaviorSubject<Invoice[]>([]);

  async submitOrder(order: Order): Promise<Invoice> {
    const invoice = await submitOrder(order);
    this.addInvoice(invoice);
    return invoice;
  }

  async getProducts(): Promise<Product[]> {
    return await getProducts();
  }

  async getConfigs() {
    return await getConfigs();
  }

  async addInvoice(invoice: Invoice): Promise<void> {
    this.invoices$.next([...this.invoices$.value, invoice]);
  }

  printInvoice(invoiceNumber: string | number) {
    printInvoice(invoiceNumber);
  }

  async removeInvoice(invoiceNumber: string | number): Promise<boolean> {
    const currentValue = this.invoices$.value;
    const index = currentValue.findIndex(i => i.invoiceNumber === invoiceNumber);
    if (index > -1) {
      currentValue.splice(index, 1);
      this.invoices$.next([...currentValue]);
      return true;
    }
    return false;
  }

  async getInvoice(invoiceNumber: string | number): Promise<Invoice | null> {
    return this.invoices$.value.find(i => i.invoiceNumber === invoiceNumber) ?? null;
  }

}
