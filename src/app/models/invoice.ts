export interface Invoice {
  invoiceNumber: string;
  storeName: string;
  storeAddress: string;
  time: Date;
  totalPrice: number;
  vatPrice: number;
  barCode: string;
}
