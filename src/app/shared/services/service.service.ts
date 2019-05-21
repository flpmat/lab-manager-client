import { Injectable } from '@angular/core';
import { Http, Response, Headers, BrowserXhr, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import swal, { SweetAlertType } from 'sweetalert2'

declare var $: any;
declare var window: any;
declare var Promise: any;

@Injectable()
export class Services extends BrowserXhr {

  constructor(
    private http: Http
  ) {
    super();
  }

  public build(): any {
    let xhr = super.build();
    xhr.responseType = "blob";
    return <any>(xhr);
  }

  getHeadersFormData(): Headers {
    let headers = new Headers();
    let sessionToken = window.sessionStorage.getItem('access_token');
    let localToken = window.localStorage.getItem('access_token');
    headers.append("Access-Control-Allow-Origin", "*");
    // headers.append("Content-Type", "multipart/form-data");
    headers.append('Authorization', 'bearer ' + (sessionToken || localToken));
    return headers;
  }

  getHeaders(): Headers {
    let headers = new Headers();
    // let sessionToken = window.sessionStorage.getItem('access_token');
    // let localToken = window.localStorage.getItem('access_token');
    headers.append("Access-Control-Allow-Origin", "*");
    // headers.append("Content-Type", "multipart/form-data");
    // headers.append('Authorization', 'bearer ' + (sessionToken));
    return headers;
  }

  get(schema: string): Promise<any[]> {
    let headers = this.getHeaders();
    return Promise.resolve(this.http.get(environment.LabManagerApi + schema, { headers: headers })
      .toPromise()
      .then((res) => {
        return JSON.parse(res.text())
      })
      .catch((res) => {
        this.msgRetorno(schema, res, 'get');
        return [];
      }));
  }

  post(schema: string, body: any, files: any): Promise<any[]> {

    let headers = this.getHeaders();

    return Promise.resolve(this.http.post(environment.LabManagerApi + schema, body, { headers: headers })
      .toPromise()
      .then((res) => {
        this.msgRetorno(schema, res, 'post');
        return JSON.parse(res.text())
      })
      .catch((res) => {
        this.msgRetorno(schema, res, 'post');
        return [];
      })
    );
  }

  delete(schema: string, id: any): Promise<any[]> {
    let headers = this.getHeaders();
    return Promise.resolve(this.http.delete(environment.LabManagerApi + schema + "/" + id, { headers: headers })
      .toPromise()
      .then((res) => {
        this.msgRetorno(schema, res, 'delete');
        return []
      })
      .catch((res) => {
        console.log(res);
        this.msgRetorno(schema, res, 'delete');
        return [];
      })
    );
  }

  postFormData(schema: string, body: any, files: any): Promise<any[]> {
    let headers = this.getHeadersFormData();

    return Promise.resolve(this.http.post(environment.LabManagerApi + schema, body, { headers: headers })
      .toPromise()
      .then((res) => {
        this.msgRetorno(schema, res, 'post');
        return JSON.parse(res.text())
      })
      .catch((res) => {
        this.msgRetorno(schema, res, 'post');
        return [];
      })
    );
  }

  put(schema: string, body: any, id: any): Promise<any[]> {
    let headers = this.getHeaders();
    return Promise.resolve(this.http.put(environment.LabManagerApi + schema + "/" + id, body, { headers: headers })
      .toPromise()
      .then((res) => {
        this.msgRetorno(schema, res, 'put');
        return JSON.parse(res.text())
      })
      .catch((res) => {
        this.msgRetorno(schema, res, 'put');
        return [];
      })
    );
  }

  putWithoutBody(schema: string): Promise<any[]> {
    let headers = this.getHeaders();
    return Promise.resolve(this.http.put(environment.LabManagerApi + schema, { headers: headers })
      .toPromise()
      .then((res) => {
        this.msgRetorno(schema, res, 'put');
        return JSON.parse(res.text())
      })
      .catch((res) => {
        this.msgRetorno(schema, res, 'put');
        return [];
      })
    );
  }

  putFormData(schema: string, body: any, id: any): Promise<any[]> {
    let headers = this.getHeadersFormData();

    return Promise.resolve(this.http.post(environment.LabManagerApi + schema + "/" + id, body, { headers: headers })
      .toPromise()
      .then((res) => {
        this.msgRetorno(schema, res, 'put');
        return JSON.parse(res.text())
      })
      .catch((res) => {
        this.msgRetorno(schema, res, 'put');
        return [];
      })
    );
  }

  putFormDataValidar(schema: string, body: any, id: any): Promise<any[]> {
    let headers = this.getHeadersFormData();

    return Promise.resolve(this.http.post(environment.LabManagerApi + schema + "/" + id, body, { headers: headers })
      .toPromise()
      .then((res) => {
        this.msgRetorno(schema, res, 'validar');
        return JSON.parse(res.text())
      })
      .catch((res) => {
        this.msgRetorno(schema, res, 'validar');
        return [];
      })
    );
  }

  msgRetorno(schema: string, res: any, method: string): any {
    var str: string;
    var typeMessage: SweetAlertType;

    if (res.status == 200) {
      typeMessage = 'success'
      switch (method) {
        case 'post':
          str = 'Cadastro realizado com sucesso'
          break;
        case 'put':
          str = 'Atualização realizada com sucesso'
          break;
        case 'delete':
          str = 'Exclusão realizada com sucesso'
          break;
        case 'validar':
          str = 'Validação realizada com sucesso'
          break;
      }
    } else {
      switch (res.status) {
        case 204:
          typeMessage = 'success'
          str = 'Exclusão realizada com sucesso'
          break;
        case 400:
          typeMessage = 'warning'
          str = JSON.parse(res._body)
          break;
        case 401:
          typeMessage = 'error'
          str = 'Operação não autorizada'
          break;
        case 403:
          typeMessage = 'error'
          str = 'Acesso negado'
          break;
        case 404:
          typeMessage = 'warning'
          str = 'Rota de aplicação não disponível'
          break;
        case 406:
          typeMessage = 'warning'
          str = 'Dados não validos'
          break;
        case 409:
          typeMessage = 'warning'
          str = res._body
          break;
        case 500:
          typeMessage = 'warning'
          str = 'Erro interno da aplicação'
          break;
        default:
          typeMessage = 'warning'
          str = 'Problema ao carregar, contate o nosso suporte. ' + schema.toLocaleUpperCase();
          break;

      }
    }
    swal.fire('', str, typeMessage)
    }

}