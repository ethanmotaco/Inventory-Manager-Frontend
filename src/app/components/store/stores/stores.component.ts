import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit} from '@angular/core';
import { ClientService } from 'src/app/data/client-service';
import { StoreElement } from 'src/app/data/models';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit, AfterViewInit {
  
  storeDataSource: StoreElement[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'address', 'email', 'phone', 'actions'];

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
      this.getStores();
  }

  ngAfterViewInit(): void {
  }

  refresh() {
    this.getStores();
  }

  public getStores(): void {
    this.clientService.getStores().subscribe(
      (response: StoreElement[]) => {
        this.storeDataSource = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public removeStore(store: StoreElement): void {

    this.clientService.deleteStore(store.id).subscribe(
      (response: void) => {
        this.refresh();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
