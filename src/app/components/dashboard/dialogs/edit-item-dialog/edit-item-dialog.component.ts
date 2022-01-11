import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/data/client-service';
import { QuantityDialogData } from '../../dashboard.component';

@Component({
  selector: 'app-edit-item-dialog',
  templateUrl: './edit-item-dialog.component.html',
  styleUrls: ['./edit-item-dialog.component.css']
})
export class EditItemDialogComponent implements OnInit {

  constructor(private clientService: ClientService, public dialogRef: MatDialogRef<EditItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuantityDialogData) {

    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.data.quantity = +(<HTMLInputElement>document.getElementById("quantity")).value;
    this.dialogRef.close(this.data);
 }

}
