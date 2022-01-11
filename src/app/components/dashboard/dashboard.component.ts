import { Component, OnInit, ViewChild,} from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ClientService } from 'src/app/data/client-service';
import { HttpErrorResponse } from '@angular/common/http';
import { StoreElement, ProductElement, LogItemElement, ProductQuantityElement } from 'src/app/data/models';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from './dialogs/add-item-dialog/add-item-dialog.component';
import { EditItemDialogComponent } from './dialogs/edit-item-dialog/edit-item-dialog.component';


export interface ProductDialogData {
  storeName: string;
  storeId: number;
  product: ProductElement;
}

export interface QuantityDialogData {
  store: StoreElement;
  product: ProductElement;
  quantity: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  layoutCols: number = 2;
  inventoryRows: number = 3;
  inventoryCols: string[] = ['name', 'description', 'quantity', 'actions'];
  logCols: string[] = ['product', 'quantity', 'timestamp'];


  inventoryDataSource: ProductQuantityElement[] = [];
  inboundLogDataSource: LogItemElement[] = [];
  outboundLogDataSource: LogItemElement[] = [];
  
  stores: StoreElement[] = [];
  selected = this.stores[0];

  constructor(private clientService: ClientService, public dialog: MatDialog, private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.Handset
    ]).subscribe(result => {
      if (result.matches) {
        this.layoutCols = 1;
        this.inventoryRows = 1;
      } else {
        this.layoutCols = 2;
        this.inventoryRows = 3;
      }
    });
  }

  ngOnInit() {
    this.getStores();
  }

  onSelectionChanged() {
    this.getInventory();
    this.getInboundLogs()
    this.getOutboundLogs()
  }

  refresh() {
    this.getInventory();
    this.getInboundLogs()
    this.getOutboundLogs()
  }

  openProductDialog(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '300px',
      data: {storeName: this.selected.name, storeId: this.selected.id, product: undefined},
    });

    dialogRef.afterClosed().subscribe(result => {
      let newProductQuantity: ProductQuantityElement = {
        store: this.selected,
        product: result.product,
        quantity: 0,
      };

      this.clientService.addProductToStore(newProductQuantity).subscribe(
        (response: ProductQuantityElement) => {
          this.refresh();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    });
  }

  openEditDialog(productQuantity: ProductQuantityElement): void {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: '300px',
      data: {store: this.selected, product: productQuantity.product, quantity: productQuantity.quantity},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clientService.updateProductQuantity(result).subscribe(
        (response: ProductQuantityElement) => {
          this.refresh();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    });
  }

  public removeProduct(productQuantity: ProductQuantityElement): void {
    this.clientService.deleteProductFromStore(productQuantity.store.id, productQuantity.product.id).subscribe(
      (response: void) => {
        this.refresh();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getStores(): void {
    this.clientService.getStores().subscribe(
      (response: StoreElement[]) => {
        this.stores = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getInboundLogs(): void {
    this.clientService.getInboundLogsByStoreId(this.selected.id).subscribe(
      (response: LogItemElement[]) => {
        this.inboundLogDataSource = response.reverse();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getOutboundLogs(): void {
    this.clientService.getOutboundLogsByStoreId(this.selected.id).subscribe(
      (response: LogItemElement[]) => {
        this.outboundLogDataSource = response.reverse();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getInventory(): void {
    this.clientService.getProductsByStore(this.selected.id).subscribe(
      (response: ProductQuantityElement[]) => {
        this.inventoryDataSource = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
