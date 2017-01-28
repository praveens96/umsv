import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {MediaPlugin} from 'ionic-native';
import {Player} from '../../providers/player';

/*
  Generated class for the Tracks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tracks',
  templateUrl: 'tracks.html'
})
export class TracksPage {

  currentAlbum:any;
  albumName:string;
  albumId:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platform:Platform,private player:Player) {
    this.currentAlbum = this.navParams.get('albumDetails');
    console.log("currentAlbum:"+JSON.stringify(this.currentAlbum));
    this.albumName = this.currentAlbum.name;
    this.albumId = this.currentAlbum.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TracksPage');
  }

  playAudio(trackObj){
    var path = window.location.pathname;
    console.log("path:"+"file://"+path+"audios/2.mp3");
    console.log("trackObj:"+JSON.stringify(trackObj));
    // let filePath = trackObj;//"audios/2.mp3";
    trackObj.albumId = this.albumId;
    trackObj.albumName = this.albumName;
    this.player.startPlayer(trackObj);
    console.log("player index:"+(this.player.playList.length));
    this.player.currentTrackIndex = this.player.playList.length|0;

    // $var audioFile = new MediaPlugin(filePath);
    // var audioFile = new MediaPlugin(this.getCordovaPath(filePath));
    // ,{
    //   console.log("file exists");
    // },{
    //   console.log("file not found");
    // }
    // console.log("audioFile:"+audioFile);
    // if(audioFile!=null||audioFile!=undefined)
    // {
    //   // audioFile.init.then(() => {
    //   //   console.log('Playback Finished');
    //   // }, (err) => {
    //   //   console.log('somthing went wrong! error code: ' + err.code + ' message: ' + err.message);
    //   // });
    //   // play the file
    //   audioFile.play();
    // }
    // else
    // {
    //   console.log("file not found");
    // }

  }
  getCordovaPath(mediaPath){
    if(this.platform.is('android')){
      return mediaPath;//"file://"+
    }
    return mediaPath;
  }

}
