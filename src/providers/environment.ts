import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Environment provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Environment {
  _envs={
    dev:{
      host:"",
      config:{
        getAlbums:"assets/sample.json"
      }
    },
    test:{
      host:"https://mobilitystorageacc.blob.core.windows.net/",
      config:{
        getAlbums:"empselfies/sample.json"
      }
    },
    prod:{
      host:"",
      config:{
        getAlbums:""
      }
    }
  };
  _env={};
  _selectedEnv = "test";

  constructor(public http: Http) {
    console.log('Hello Environment Provider');
    this._env = this._envs[this._selectedEnv];
  }
  get(property){
    console.log("host+endpoint:"+this._env["host"]+this._env["config"][property]);
    return this._env["host"]+this._env["config"][property];
  }

}
