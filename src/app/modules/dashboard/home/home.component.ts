import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private saveToFileSystem() {
    const filename = "test.json";
    const blob = new Blob(['sdsdfsdfs'], { type: 'text/plain' });
    saveAs(blob, filename);
  }
}
