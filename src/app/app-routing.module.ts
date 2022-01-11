import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoresComponent } from './components/store/stores/stores.component';
import { AddStoreComponent } from './components/store/add-store/add-store.component';
import { CatalogComponent } from './components/inventory/catalog/catalog.component';
import { AddProductComponent } from './components/inventory/add-product/add-product.component';
import { InboundLogComponent } from './components/log/inbound-log/inbound-log.component';
import { OutboundLogComponent } from './components/log/outbound-log/outbound-log.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'stores/add', component: AddStoreComponent },
  { path: 'inventory', component: CatalogComponent },
  { path: 'inventory/add', component: AddProductComponent },
  { path: 'logs/inbound', component: InboundLogComponent },
  { path: 'logs/outbound', component: OutboundLogComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
