import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/env'; 
@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  constructor(private http: HttpClient, private router: Router) { }
  create(shemaData:any):Observable<any>
  {
    const BODY = shemaData;
    return this.http.post<any>(environment.apiUrl + '/schema/create', BODY);
  }

  update(shemaData:any,id:string | null):Observable<any>
  {
    const BODY = shemaData;
    return this.http.put<any>(environment.apiUrl + '/schema/create/'+id, BODY);
  }

  getSchemas():Observable<any>
  {
     return this.http.get<any>(environment.apiUrl + '/schema/get');
  }

  getSchema(id:string | null):Observable<any>
  {
     return this.http.get<any>(environment.apiUrl + '/schema/get-schema/' + id);
  }

  addNewField(fieldData:any,id:any):Observable<any>
  {
    const BODY = fieldData;
    return this.http.put<any>(environment.apiUrl + '/schema/add-field/' + id, BODY);
  }

  getFileData(bodyData:any)
  {
    const OPTIONS: Object = {
      responseType: 'blob'
    };
    return this.http.post<any>(environment.apiUrl + '/schema/get-file', bodyData, OPTIONS);
  }

  createDynamicSchema(schemaInfo:any,fieldsData:any,schemaData:any,schema_id:string | null)
  {
    const BODY:any = {
      schema_info : schemaInfo,
      schema_data : schemaData,
      fields_data : fieldsData,
      schema_id : schema_id
    };
    return this.http.post<any>(environment.apiUrl + '/schema/create-dynamic-schema', BODY);
  }

  getSchemaSourceObj(id:string | null):Observable<any>
  {
     return this.http.get<any>(environment.apiUrl + '/schema/get-source-objects/' + id);
  }
}