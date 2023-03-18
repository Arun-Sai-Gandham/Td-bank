import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {
@Input() label:any;
@Input() id:any;
@Input() options:any;
@Input() formControllName:any;
}
