import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject,} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { ClientService } from 'src/app/data/client-service';
import { ProductElement} from 'src/app/data/models';
import { ProductDialogData } from '../../dashboard.component';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent {
  productList: ProductElement[] = [];
  selectedProduct!: ProductElement;

  constructor(private clientService: ClientService, public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData) {

    }

  ngOnInit(): void {
    this.getAvailableProducts(this.data.storeId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectionChanged(options: MatListOption[]){
    this.data.product = options[0].value;
    this.dialogRef.close(this.data);
 }



  public getAvailableProducts(storeId: number): void {
    this.clientService.getAvailableProducts(storeId).subscribe(
      (response: ProductElement[]) => {
        this.productList = response;
        console.log(this.productList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
