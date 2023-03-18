import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { HomeComponent } from './home/home.component';
import { DashboardMainComponent } from './main/main.component';

const routes: Routes = [
  { path: "", redirectTo: "/dashboard/home", pathMatch: "full" },
  { path: "", component:DashboardMainComponent,
    children:[
      {path:"home",component:HomeComponent},
      {path:"analytics",component:AnalyticsComponent},
  ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
