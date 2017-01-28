import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Player} from '../../providers/player';

/*
  Generated class for the Downloads page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-downloads',
  templateUrl: 'downloads.html'
})
export class DownloadsPage {
  downloadedTracks:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appStorage:Storage, private player:Player) {
    this.downloadedTracks = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DownloadsPage');
  }
  ionViewWillEnter(){
    this.appStorage.get('tracksMasterJSON').then((localMasterJSON)=>{
      console.log("localMasterJSON in downloads:"+JSON.stringify(localMasterJSON));
      for(let oneAlbum of localMasterJSON.Albums){
        for(let oneTrack of oneAlbum.tracks){
          console.log("oneAlbum.localUrl &&"+oneTrack.localUrl );
          if( oneTrack.localUrl!="" && oneTrack.localUrl!= undefined &&oneTrack.localUrl!="undefined"){
            if(this.downloadedTracks.length>0){
              for(let downloadedTrack of this.downloadedTracks){
                if(downloadedTrack.id!=oneTrack.id){
                  this.downloadedTracks.push(oneTrack);
                }

              }
            }else{
              this.downloadedTracks.push(oneTrack);
            }


          }
        }
      }
    })
  }
  playTrack(trackObj){
    this.player.startPlayer(trackObj);
  }
}
