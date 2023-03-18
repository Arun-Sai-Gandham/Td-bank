import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generateSchemaId'
})
export class GenerateSchemaIdPipe implements PipeTransform {

  transform(value: any){
    return value.replace(/\s+/g, '_').toLowerCase();
  }

}
