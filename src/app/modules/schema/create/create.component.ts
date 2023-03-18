import { Component, ViewChild } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { GenerateSchemaIdPipe } from 'src/app/shared/pipes/generateSchemaId/generate-schema-id.pipe';
import { SchemaService } from '../schema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers:[
    GenerateSchemaIdPipe
  ]
})
export class CreateComponent {

  isEdit:boolean = this.route.snapshot.paramMap.get('id') ? true : false;
  schemaData:any;
  allowSubmit:boolean = false;
  schemaEditObject:any;
  togglePopUp:boolean = false;
  fieldsData:any = [];
  dataSourceObjects:any = [];
  @ViewChild(PopupComponent)
  PopupComponent!: PopupComponent;

  newFieldForm:any = [{
      key:"name",
      value: "",
      validators: [Validators.required],
      label: "Field Name",
      placeholder: "Enter Field name",
      outer_classes: "col-md-12",
      label_classes: "",
      input_classes: "",
    },
    {
      key:"desc",
      value: "",
      validators: [Validators.required],
      label: "Field Description",
      placeholder: "Enter Field Description",
      outer_classes: "col-md-12",
      label_classes: "",
      input_classes: "",
    },
    {
        type: "select",
        key:"data_type",
        value: "string",
        validators: [Validators.required],
        label: "Field Type",
        outer_classes: "col-md-12",
        label_classes: "",
        input_classes: "",
        options:[
          {key:"string",value:"String"},
          {key:"integer",value:"Integer"}
        ]
      },
  ];

  constructor(private fb:FormBuilder, private GSchemaId:GenerateSchemaIdPipe, private schemaService:SchemaService, private router: Router,private route: ActivatedRoute, private toastr: ToastrService ){ }

  ngOnInit(): void {
    this.schemaData = this.fb.group({
      name : ['',[Validators.required,Validators.minLength(5)]],
      schema_id : [{value: '', disabled: false},[Validators.required]],
      user_name : ['',Validators.required],
      password : ['',Validators.required],
      url : ['',Validators.required],
      port : ['',Validators.required],
      dir_path : ['',Validators.required],
      file_name : ['',Validators.required],
      file_type : ['CSV',Validators.required]
    });
    if(this.isEdit)
    {
      this.schemaService.getSchema(this.route.snapshot.paramMap.get('id')).subscribe(res => 
        {
          this.schemaData.patchValue(res[0]);
          this.fieldsData = res[0].fields;
        });
    }
    this.getSourceObjects();
  }
  
  // Generating and assigning schema name in formate to schema id
  generateSchemaId(){ 
    this.schemaData.patchValue({schema_id : this.GSchemaId.transform(this.schemaData.value.name)});
  }

  // save schema details
  saveSchema():void
  {
    if (this.schemaData.invalid) {
      this.schemaData.markAllAsTouched();
      return;
    }
    try
    {
      let submitType;
      if(this.isEdit)
      {
        submitType = this.schemaService.update(this.schemaData.value,this.route.snapshot.paramMap.get('id'));
      }
      else
      {
        submitType = this.schemaService.create(this.schemaData.value);
        this.router.navigate(['/schema/all']);
      }
      submitType.pipe(
        catchError((error) => {
          if (error.status === 401) {
            return throwError('Authentication error');
          } else if (error.status === 404) {
            // handle not found error
            return throwError('Data not found');
          } else {
            // handle other errors
            return throwError('Something went wrong');
          }
        })
      ).subscribe(response => {
        console.log(response);
        return response;
      });
      
    }
    catch (error)
    {
      console.log(error);
    }
    
  }

  // add new field
  addNewField(newFieldData:any):void
  {
    try
    {
      this.schemaService.addNewField(newFieldData,this.route.snapshot.paramMap.get('id'))
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            return throwError('Authentication error');
          } else if (error.status === 404) {
            // handle not found error
            return throwError('Data not found');
          } else {
            // handle other errors
            return throwError('Something went wrong');
          }
        })
      ).subscribe(response => {
        this.PopupComponent.togglePopup();
        this.getFieldsData();
        return response;
      });
      
    }
    catch (error)
    {
      console.log(error);
    }
  }

  getFieldsData():void
  {
    if(this.isEdit)
    {
      this.schemaService.getSchema(this.route.snapshot.paramMap.get('id')).subscribe(res => 
        {
          this.fieldsData = res[0].fields;
        });
    }
  }

  runscheduleNow():void{
    this.schemaService.getFileData({}).subscribe((response: Blob) => {
      const fileReader = new FileReader();

      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        this.schemaService.createDynamicSchema(this.schemaData.value,this.fieldsData,jsonData,this.route.snapshot.paramMap.get('id')).subscribe(res => console.log(res));
        this.getSourceObjects();
        console.log(jsonData);
      };

      fileReader.readAsArrayBuffer(response);
    });
  }

  getSourceObjects():void
  {
    this.schemaService.getSchemaSourceObj(this.route.snapshot.paramMap.get('id')).subscribe(res => 
    {
      console.log(res);
      this.dataSourceObjects = res ? res : [];
    });
    
  }
  
}
