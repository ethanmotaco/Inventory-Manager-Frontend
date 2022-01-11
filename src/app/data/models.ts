export interface StoreElement {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
  }

export interface ProductElement {
    id: number;
    name: string;
    description: string;
    quantity: number;
  }

export interface LogItemElement {
    id: number;
    storeName: string;
    productName: string;
    quantity: number;
  }

export interface ProductQuantityElement {
  store: StoreElement;
  product: ProductElement;
  quantity: number;
} 