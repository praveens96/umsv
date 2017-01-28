import { Component } from '@angular/core';

import { NavController,Platform } from 'ionic-angular';
import {MediaPlugin} from 'ionic-native';

import {AlbumslistPage} from '../albumslist/albumslist';
import {PlayerPage} from '../player/player';
import {DownloadsPage} from '../downloads/downloads';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  albumsRoot = AlbumslistPage;
  playerRoot = PlayerPage;
  downloadsRoot = DownloadsPage;
  constructor(public navCtrl: NavController,private platform:Platform) {

  }
  // onStatusUpdate(status) {
  //   console.log("status:"+status);
  // }
  play(){
    var path = window.location.pathname;
    console.log("path:"+"file://"+path+"audios/2.mp3");
    let filePath = "audios/2.mp3";
    var audioFile = new MediaPlugin(this.getCordovaPath(filePath));
    // ,{
    //   console.log("file exists");
    // },{
    //   console.log("file not found");
    // }
    console.log("audioFile:"+audioFile);
    if(audioFile!=null||audioFile!=undefined)
    {
      // audioFile.init.then(() => {
      //   console.log('Playback Finished');
      // }, (err) => {
      //   console.log('somthing went wrong! error code: ' + err.code + ' message: ' + err.message);
      // });
    }
    else
    {
      console.log("file not found");
    }
// play the file
audioFile.play();

// pause the audioFile
// audioFile.pause();

// get current playback position
// audioFile.getCurrentPosition().then((position) => {
//   console.log(position);
// });

// get audioFile duration
// audioFile.getDuration().then((duration) => {
//   console.log(position);
// });

// skip to 10 seconds (expects int value in ms)
// audioFile.seekTo(10000);

// stop playing the audioFile
// audioFile.stop();

// release the native audio resource
// Platform Quirks:
// iOS simply create a new instance and the old one will be overwritten
// Android you must call release() to destroy instances of media when you are done
// audioFile.release();

  }
  getCordovaPath(mediaPath){
    if(this.platform.is('android')){
      return mediaPath;//"file://"+
    }
    return mediaPath;
  }

  // getMediaURL(mediaPath) {
  //   // if (this.platform.is('android')) {
  //   //   return "/android_asset/www/assets/" + mediaPath;
  //   // }
  //   // return "../../assets/" + mediaPath;
  // }

}
