import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './service/dashboard.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers:[
    DashboardService
  ]
})
export class DashboardModule { }
