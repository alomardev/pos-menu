import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from './models/category';
import { Product } from './models/product';
import { Order } from './models/order';
import { OrderItem } from './models/order-item';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ScpDialogManager } from './components/dialogs/services/dialog-manager.service';
import { ScpDialogComponent } from './components/dialogs/dialog/dialog.component';
import { Invoice } from './models/invoice';

declare function getVATDetails(): Promise<{ vatRate: number, vatNumber: string }>;
declare function getProducts(): Promise<Product[]>;
declare function getProducts(): Promise<Product[]>;
declare function submitOrder(order: Order): Promise<Invoice>

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  autoInsertFromBarCodeEnabled = true;

  allItems: Product[] | null = null;
  filteredItems: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: string | null = null;
  orderItems: OrderItem[] = [];
  order: Order = {
    items: [],
    totalPrice: 0,
    vatPrice: 0,
  };
  vatDetails: { vatRate: number, vatNumber: string } = { vatRate: 1, vatNumber: '' };
  invoice: Invoice | null = null;

  loading = {
    items: false,
    invoice: false,
  };

  barCodeInput: FormControl = new FormControl();

  @ViewChild('submitDialog', { static: true }) submitDialog!: ScpDialogComponent;

  constructor(private dialogManager: ScpDialogManager) {}

  ngOnInit() {
    this.loadVATDetails();
    this.loadItems();
    this.barCodeInput.valueChanges.pipe(
      debounceTime(250),
    ).subscribe(code => {
      if (this.autoInsertFromBarCodeEnabled) {
        this.addOrderItemFromBarCode(code);
      }
    });

    this.barCodeInput.valueChanges.subscribe(code => {
      if (!this.autoInsertFromBarCodeEnabled) {
        this.filterByCode(code);
      }
    });
  }

  onItemUpdate(item: OrderItem) {
    this.calculateTotal();
  }

  onItemDelete(item: OrderItem) {
    const itemIndex = this.orderItems.findIndex(i => i.product.itemId === item.product.itemId);
    if (itemIndex >= 0) {
      this.orderItems.splice(itemIndex, 1);
    }
    this.calculateTotal();
  }

  onCategoryUpdate(category: Category) {
    this.categories.forEach(c => {
      c.selected = c.id === category.id;
      if (c.selected) {
        this.selectedCategoryId = c.id;
      }
    });
    this.filterItems();
  }

  resolveInvalidImage(event: ErrorEvent) {
    (event.target as HTMLElement).style.display = 'none';
  }

  toggleAutoInsert() {
    this.autoInsertFromBarCodeEnabled = !this.autoInsertFromBarCodeEnabled;
    if (this.autoInsertFromBarCodeEnabled) {
      this.barCodeInput.setValue('');
      this.filterItems();
    } else {
      this.filterByCode(this.barCodeInput.value);
    }
  }

  addOrderItem(item: Product) {
    const existingOrderItem = this.orderItems.find(i => i.product.itemId === item.itemId);
    if (existingOrderItem) {
      existingOrderItem.quantity++;
    } else {
      this.orderItems.push({ product: item, quantity: 1, sumPrice: item.price });
    }
    this.calculateTotal();
  }

  discardCurrentOrder() {
    this.dialogManager.confirm({
      icon: 'warning',
      message: 'سيتم إلغاء الطلب الحالي.',
      title: 'تأكيد!',
      submit: () => {
        this.createNewOrder();
      }
    });
  }

  createNewOrder() {
    this.orderItems = [];
    this.calculateTotal();
  }

  async submit() {
    this.submitDialog.show();
    this.loading.invoice = true;
    const invoice = await submitOrder(this.order);
    this.loading.invoice = false;
    this.invoice = invoice;
  }

  onSubmitDialogAction(action: string) {
    if (action === 'newOrder') {
      this.createNewOrder();
    }
  }

  private async loadVATDetails() {
    this.vatDetails = await getVATDetails();
  }

  private calculateTotal() {
    let subtotal = this.order.totalPrice = this.order.vatPrice = 0;
    this.orderItems.forEach(item => {
      subtotal += item.product.price * item.quantity;
      item.sumPrice = Math.ceil(item.quantity * item.product.price * 100) / 100;
    });
    subtotal = Math.ceil(subtotal * 100) / 100;
    this.order.vatPrice = Math.ceil(subtotal * this.vatDetails.vatRate * 100) / 100;
    this.order.totalPrice = Math.ceil((subtotal + this.order.vatPrice) * 100) / 100;

    this.order.items = this.orderItems;
  }

  private async loadItems() {
    this.loading.items = true;
    this.allItems = await getProducts();
    this.loading.items = false;
    this.categories = [{
      id: null,
      name: 'كافة الأصناف',
      selected: true,
    }];
    for (const item of this.allItems) {
      if (this.categories.findIndex(c => c.id === item.categoryId) > -1) {
        continue;
      }
      this.categories.push({
        id: item.categoryId,
        name: item.categoryName,
        selected: false,
      });
    };
    this.filterItems();
  }

  private filterItems() {
    if (this.selectedCategoryId === null) {
      this.filteredItems = this.allItems ?? [];
    } else {
      this.filteredItems = this.allItems?.filter(i => i.categoryId === this.selectedCategoryId) ?? [];
    }
  }

  private addOrderItemFromBarCode(code: string) {
    const item = this.allItems?.find(i => i.barCode === code);
    if (item) {
      this.addOrderItem(item);
      this.barCodeInput.setValue('');
    }
  }

  private filterByCode(code: string) {
    if (!code) {
      this.filteredItems = this.allItems ?? [];
    }
    this.filteredItems = this.allItems?.filter(i => i.barCode.startsWith(code)) ?? [];
  }

  // testLog(something: any) {
  //   console.log(something);
  // }

}
