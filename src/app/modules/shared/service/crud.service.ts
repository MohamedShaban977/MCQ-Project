import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public BaseUrl = 'http://localhost:3000/'


  constructor(private http: HttpClient) { }

  get<T>(url: string, endPoint: string, params?: Object | null): Observable<T> {


    let options = {}

    if (params != null) {
      options = { params: this._buildHttpPrams(params) }
    }

    return this.http.get<T>(`${url}${endPoint}`, options);
  }

  post<T>(url: string, endPoint: string, body: any, isFormData: boolean = false, params?: Object | null): Observable<T> {

    let bodyData: any = isFormData ? this._jsonToFormData(body) : body;

    let options = {}
    if (params != null) {
      options = { params: this._buildHttpPrams(params) }
    }


    return this.http.post<T>(`${url}${endPoint}`, bodyData, options);
  }

  put<T>(url: string, endPoint: string,
    body: any,
    isFormData: boolean = false,
    params?: Object | null): Observable<T> {

    let bodyData: any = isFormData ? this._jsonToFormData(body) : body;

    let options = {}
    if (params != null) {
      options = { params: this._buildHttpPrams(params) }
    }

    return this.http.put<T>(`${url}${endPoint}`, bodyData, options);

  }

  delete<T>(url: string, endPoint: string, body?: any, params?: Object | null): Observable<T> {

    let options = {
      body: body,
      params: this._buildHttpPrams(params || {})
    }
    return this.http.delete<T>(`${url}${endPoint}`, options);
  }




  private _buildHttpPrams(params: Object): HttpParams {
    let httpParams = new HttpParams();

    if (params != null) {
      Object.keys(params).forEach((k, i) => {
        var d = Object.values(params)[i];
        if (d == null || d == '') { }
        else {
          // console.log(`key=> ${k} , value=> ${d}`);
          httpParams = httpParams.append(k, d)
        }
      });
    }

    return httpParams;
  }
  private _jsonToFormData(data: any) {
    const formData = new FormData();

    this._buildFormData(formData, data);

    return formData;

  }
  private _buildFormData(formData: FormData, data: any, parentKey?: any) {

    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {

      Object.keys(data).forEach(key => {
        this._buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    }
    else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  }




}
