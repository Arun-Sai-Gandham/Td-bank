import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MainComponent } from './shared/main/main.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from './modules/auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchemaModule } from './modules/schema/schema.module';
import { GenerateSchemaIdPipe } from './shared/pipes/generateSchemaId/generate-schema-id.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    GenerateSchemaIdPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    FontAwesomeModule,
    SchemaModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
