import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  showPopup: boolean;
  @Input() button_text: any;
  @Input() show_pop_up: any;
  constructor() {
    this.showPopup = this.show_pop_up || false;
  }
  togglePopup() {
    this.showPopup = !this.showPopup;
  }
}
