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
import { ButtonGroupItem } from './components/button-group-control/button-group-control.component';
import { OrdersService } from './services/orders.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly initialOrder: Order = {
    items: [],
    totalPrice: 0,
    vatPrice: 0,
    cashOrBank: 'cash',
  };

  autoInsertFromBarCodeEnabled = true;

  allItems: Product[] | null = null;
  filteredItems: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: string | null = null;
  orderItems: OrderItem[] = [];
  order: Order = { ...this.initialOrder };
  configs: { vatRate: number, vatNumber: string, ordersListUrl?: string } = { vatRate: 1, vatNumber: '' };
  invoice: Invoice | null = null;

  loading = {
    items: false,
    invoice: false,
  };

  barCodeInput: FormControl = new FormControl();
  cashOrBankInputOptions: ButtonGroupItem[] = [
    { label: 'كاش', value: 'cash' },
    { label: 'شبكة', value: 'bank' },
  ];

  @ViewChild('submitDialog', { static: true }) submitDialog!: ScpDialogComponent;

  constructor(private dialogManager: ScpDialogManager, private orderService: OrdersService) { }

  ngOnInit() {
    this.loadConfigs();
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
      this.orderItems.push({ product: item, quantity: 1, sumPrice: item.price * this.configs.vatRate });
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
    this.order = { ...this.initialOrder, cashOrBank: this.order.cashOrBank };
    this.orderItems = [];
    this.calculateTotal();
  }

  async submit() {
    this.submitDialog.show(key => {
      if (key === 'newOrder') {
        this.createNewOrder();
        return true;
      }
      if (key === 'print' && this.invoice) {
        this.orderService.printInvoice(this.invoice.invoiceNumber)
        return false;
      }
      return true;
    });
    this.loading.invoice = true;
    const invoice = await this.orderService.submitOrder(this.order);
    this.loading.invoice = false;
    this.invoice = invoice;
  }

  private async loadConfigs() {
    this.configs = await this.orderService.getConfigs();
  }

  private calculateTotal() {
    this.order.totalPrice = this.order.vatPrice = 0;
    this.orderItems.forEach(item => {
      item.sumPrice = this.wrapDigits((item.quantity * item.product.price * (1 + this.configs.vatRate)));
      this.order.totalPrice += item.sumPrice;
    });
    this.order.vatPrice = this.wrapDigits((this.order.totalPrice - this.order.totalPrice / (1 + this.configs.vatRate)));
    this.order.totalPrice = this.wrapDigits(this.order.totalPrice);
    this.order.items = this.orderItems;
  }

  wrapDigits(n: number) {
    return +n.toFixed(2);
  }

  private async loadItems() {
    this.loading.items = true;
    this.allItems = await this.orderService.getProducts();
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
