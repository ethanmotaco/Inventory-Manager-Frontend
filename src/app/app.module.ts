import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { TopnavbarComponent } from './components/topnavbar/topnavbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { StoresComponent } from './components/store/stores/stores.component';
import { AddStoreComponent } from './components/store/add-store/add-store.component';
import { CatalogComponent } from './components/inventory/catalog/catalog.component';
import { AddProductComponent } from './components/inventory/add-product/add-product.component';
import { InboundLogComponent } from './components/log/inbound-log/inbound-log.component';
import { OutboundLogComponent } from './components/log/outbound-log/outbound-log.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { HttpClientModule } from '@angular/common/http';
import { AddItemDialogComponent } from './components/dashboard/dialogs/add-item-dialog/add-item-dialog.component';
import { EditItemDialogComponent } from './components/dashboard/dialogs/edit-item-dialog/edit-item-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavbarComponent,
    TopnavbarComponent,
    DashboardComponent,
    StoresComponent,
    AddStoreComponent,
    CatalogComponent,
    AddProductComponent,
    InboundLogComponent,
    OutboundLogComponent,
    AddItemDialogComponent,
    EditItemDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
