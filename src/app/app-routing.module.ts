import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthMainComponent } from './modules/auth/main/main.component';
import { MainComponent } from './shared/main/main.component';

const routes: Routes = [
  {path: "auth", component: AuthMainComponent, loadChildren: () => import("./modules/auth/auth.module").then(mod => mod.AuthModule)},
  {path: "dashboard", component:MainComponent, loadChildren: () => import("./modules/dashboard/dashboard.module").then(mod => mod.DashboardModule),canActivate:[AuthGuard]},
  {path: "chat", component:MainComponent, loadChildren: () => import("./modules/chat/chat.module").then(mod => mod.ChatModule),canActivate:[AuthGuard]},
  {path: "services", component:MainComponent, loadChildren: () => import("./modules/services/services.module").then(mod => mod.ServicesModule),canActivate:[AuthGuard]},
  {path: "schema", component:MainComponent, loadChildren: () => import("./modules/schema/schema.module").then(mod => mod.SchemaModule),canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
