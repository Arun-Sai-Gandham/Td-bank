import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardMainComponent } from './main/main.component';
import { AnalyticsComponent } from './analytics/analytics.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardMainComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
