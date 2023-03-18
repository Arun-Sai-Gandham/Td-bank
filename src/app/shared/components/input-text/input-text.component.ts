import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {
@Input() id:any;
@Input() formControlNameTest:any;
@Input() place_holder:any;
@Input() label:any;
constructor(){}
}
