import { Component } from '@angular/core';
import { SchemaService } from '../schema.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent {
schemas:any;
constructor( private schemaService:SchemaService ) {}
ngOnInit(): void {
  this.schemaService.getSchemas().subscribe(res => 
    this.schemas = res
    );
}


}
