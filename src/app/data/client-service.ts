import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreElement, ProductElement, LogItemElement, ProductQuantityElement } from 'src/app/data/models';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('username:password')
  })
};

@Injectable({ providedIn: 'root' })
export class ClientService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  //store queries

  public getStores(): Observable<StoreElement[]> {
    return this.http.get<StoreElement[]>(`${this.apiServerUrl}/store/all`, httpOptions);
  }

  public addStore(store: StoreElement): Observable<StoreElement> {
    return this.http.post<StoreElement>(`${this.apiServerUrl}/store/add`, store);
  }

  public updateStore(store: StoreElement): Observable<StoreElement> {
    return this.http.put<StoreElement>(`${this.apiServerUrl}/store/update`, store);
  }

  public deleteStore(storeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/store/delete/${storeId}`);
  }

  // product queries

  public getProducts(): Observable<ProductElement[]> {
    return this.http.get<ProductElement[]>(`${this.apiServerUrl}/product/all`);
  }

  public getAvailableProducts(storeId: number): Observable<ProductElement[]> {
    return this.http.get<ProductElement[]>(`${this.apiServerUrl}/product/findavailable/${storeId}`);
  }

  public addProduct(product: ProductElement): Observable<ProductElement> {
    return this.http.post<ProductElement>(`${this.apiServerUrl}/product/add`, product);
  }

  public updateProduct(product: ProductElement): Observable<ProductElement> {
    return this.http.put<ProductElement>(`${this.apiServerUrl}/product/update`, product);
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/product/delete/${productId}`);
  }

  // quantity queries

  public getProductsByStore(storeId: number): Observable<ProductQuantityElement[]> {
    return this.http.get<ProductQuantityElement[]>(`${this.apiServerUrl}/quantity/${storeId}`);
  }

  public addProductToStore(productQuantity: ProductQuantityElement): Observable<ProductQuantityElement> {
    return this.http.post<ProductQuantityElement>(`${this.apiServerUrl}/quantity/add`, productQuantity);
  }

  public updateProductQuantity(productQuantity: ProductQuantityElement): Observable<ProductQuantityElement> {
    return this.http.put<ProductQuantityElement>(`${this.apiServerUrl}/quantity/update`, productQuantity);
  }

  public deleteProductFromStore(storeId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/quantity/delete/${storeId}/${productId}`);
  }

  // log queries

  public getInboundLogs(): Observable<LogItemElement[]> {
    return this.http.get<LogItemElement[]>(`${this.apiServerUrl}/inboundLog/find/all`);
  }

  public getInboundLogsByStoreId(storeId: number): Observable<LogItemElement[]> {
    return this.http.get<LogItemElement[]>(`${this.apiServerUrl}/inboundLog/find/${storeId}`);
  }

  public getOutboundLogs(): Observable<LogItemElement[]> {
    return this.http.get<LogItemElement[]>(`${this.apiServerUrl}/outboundLog/find/all`);
  }

  public getOutboundLogsByStoreId(storeId: number): Observable<LogItemElement[]> {
    return this.http.get<LogItemElement[]>(`${this.apiServerUrl}/outboundLog/find/${storeId}`);
  }
}