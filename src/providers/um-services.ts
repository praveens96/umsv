import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Environment} from './environment';
/*
  Generated class for the UMServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UMServices {

  constructor(public http: Http,private env:Environment) {
    console.log('Hello UMServices Provider');
  }
  httpGet(url){
    return this.http.get(url);
  }
  getAlbums(){
    // return this.http.get(this.env.get('getAlbums'));//this.env.get('getAlbums') '/getalbums'
    return this.httpGet(this.env.get('getAlbums'));//this.env.get('getAlbums') '/getalbums'
  }

}
