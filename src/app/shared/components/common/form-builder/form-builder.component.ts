import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent {
  // example input 
  // builder_data: any = [{
  //   key:"user_name",
  //   value: "",
  //   validators: [Validators.required],
  //   label: "User Name",
  //   placeholder: "Enter User name"
  // },{
  //   type: "radio",
  //   key:"first_name",
  //   value: "Male",
  //   validators: [Validators.required],
  //   label: "Gender",
  //   outer_classes: "col-md-6",
  //   label_classes: "",
  //   input_classes: "",
  //   options:["Male","Female"]
  // },{
  //   type: "select",
  //   key:"last",
  //   value: "Urdu",
  //   validators: [Validators.required],
  //   label: "Subjects",
  //   outer_classes: "col-md-6",
  //   label_classes: "",
  //   input_classes: "",
  //   options:[
  //     {key:"Hindi",value:"Hindi"},
  //     {key:"English",value:"English"},
  //     {key:"Telugu",value:"Telugu"},
  //     {key:"Marathi",value:"Marathi"},
  //     {key:"Urdu",value:"Urdu"}
  //   ]
  // },{
  //   type: "checkbox",
  //   key:"hobbies",
  //   value: "",
  //   name: "hobbies[]",
  //   validators: [Validators.required],
  //   label: "Hobbies",
  //   outer_classes: "col-md-6",
  //   label_classes: "",
  //   input_classes: "",
  //   options:["Cricket","Tennies","Hockey","Kabadi","Jumping","Cricket","Tennies","Hockey","Kabadi","Jumping","Cricket","Tennies","Hockey","Kabadi","Jumping"]
  // }];
  formData:any;
  formSubmitStatus:boolean = false;
  @Input() fieldsData:any = [];
  @Input() submitButtonText:string = "";
  @Output() submitedFormData = new EventEmitter<any>();
  group: any = [];
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.fieldsData.forEach((item:any) => {
      this.group[item.key] = [item.value || '', item.validators ?  item.validators : ''];
    });
    this.formData = this.fb.group(this.group);
  }

  submitForm()
  {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }
    this.submitedFormData.emit(this.formData.value);
    this.formData.reset();
  }
}
