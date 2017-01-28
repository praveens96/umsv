import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UMServices} from '../../providers/um-services';
import {TracksPage} from '../tracks/tracks';
import {Player} from '../../providers/player';
/*
  Generated class for the Albumslist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-albumslist',
  templateUrl: 'albumslist.html'
})
export class AlbumslistPage {
  allAlbums:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private umservices:UMServices, private player:Player) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumslistPage');

  }
  ionViewWillEnter(){
    console.log("viewwillenter");
    this.umservices.getAlbums().map(res=>res.json()).subscribe(allAlbums=>{
      console.log("allAlbums:"+JSON.stringify(allAlbums));
      this.allAlbums = allAlbums.Albums;
      this.player.updateMasterJSON(allAlbums);
    },
    err=>{
      console.log("err in get albums:"+JSON.stringify(err));
    });
  }
  gotoAlbum(oneAlbum){
    console.log("gotoTracks:");
    this.navCtrl.push(TracksPage,{albumDetails:oneAlbum});
  }

}
