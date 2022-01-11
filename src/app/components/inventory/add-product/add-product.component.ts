import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import { ClientService } from 'src/app/data/client-service';
import { ProductElement } from 'src/app/data/models';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private clientService: ClientService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  get form(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  
  public submitHandler(formDirective: FormGroupDirective): void {
    let newProduct: ProductElement = {
      id: 0,
      name: this.myForm.value.name,
      description: this.myForm.value.description,
      quantity: 0
    };

    formDirective.resetForm();

    this.clientService.addProduct(newProduct).subscribe(
      (response: ProductElement) => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}

