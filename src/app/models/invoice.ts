export interface Invoice {
  invoiceNumber: string | number;
  storeName: string;
  storeAddress: string;
  cashierName: string;
  time: Date;
  totalPrice: number;
  vatPrice: number;
  barCode: string;
}
