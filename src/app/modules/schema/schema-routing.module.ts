import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: "", redirectTo: "/schema/all", pathMatch: "full" },
  { path:"",component:IndexComponent,
    children:[
    { path: "create", component:CreateComponent},
    { path: "all", component:AllComponent},
    { path: "edit/:id", component:CreateComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemaRoutingModule { }
