import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postEmployee(data: any) {
    return this.http.post<any>('/create', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getEmployee() {
    return this.http.get<any>('/employees').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getEmployeeById(id:number){
    return this.http.get<any>('/employee/'+id).pipe(map((res)=>{
      return res;
    }));
  }

  updateEmployee(data: any, id:number) {
    return this.http.post<any>('/update/'+id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
