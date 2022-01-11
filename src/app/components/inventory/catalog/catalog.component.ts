import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'src/app/data/client-service';
import { ProductElement} from 'src/app/data/models';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent  implements OnInit, AfterViewInit {
  
  inventoryDataSource: ProductElement[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'actions'];

  constructor(private clientService: ClientService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
      this.getProducts();
  }

  ngAfterViewInit(): void {
  }

  refresh() {
    this.getProducts();
  }

  public getProducts(): void {
    this.clientService.getProducts().subscribe(
      (response: ProductElement[]) => {
        this.inventoryDataSource = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public removeProduct(product: ProductElement): void {

    this.clientService.deleteProduct(product.id).subscribe(
      (response: void) => {
        this.refresh();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
