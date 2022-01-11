import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ClientService } from 'src/app/data/client-service';
import { StoreElement } from 'src/app/data/models';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private clientService: ClientService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required,]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get form(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  
  public submitHandler(formDirective: FormGroupDirective): void {
    
    console.log(this.myForm.value)

    let newStore: StoreElement = {
      id: 0,
      name: this.myForm.value.name,
      address: this.myForm.value.address,
      phone: this.myForm.value.phone,
      email: this.myForm.value.email,
    };

    formDirective.resetForm();

    this.clientService.addStore(newStore).subscribe(
      (response: StoreElement) => {
        console.log(response);
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
