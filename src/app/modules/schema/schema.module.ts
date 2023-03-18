import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemaRoutingModule } from './schema-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderComponent } from 'src/app/shared/components/common/form-builder/form-builder.component';
import { FormErrorsComponent } from 'src/app/shared/components/common/form-errors/form-errors.component';
import { TextInputComponent } from 'src/app/shared/components/common/form-fields/text-input/text-input.component';
import { SchemaService } from './schema.service';
import { AllComponent } from './all/all.component';
import { ToastrModule } from 'ngx-toastr';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    FormBuilderComponent,
    FormErrorsComponent,
    TextInputComponent,
    AllComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    SchemaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    SchemaService
  ],
})
export class SchemaModule { }
