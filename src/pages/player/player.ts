import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Player} from '../../providers/player';
import {MusicControls} from 'ionic-native';

/*
  Generated class for the Player page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {
  playlist:any;
  isPlaying:string;
  currentIndex:any;
  noTracks:boolean;
  isLastTrack:boolean;
  isFirstTrack:boolean;
  trackLength:number;
  currentTime:any;
  saturation:any;
  trackLength1:any;
  // _isPlayingSubscription:any;
  // disablePlay:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,private playerSrvc:Player) {

    // this.currentTime = 0.01;
    // this.trackLength= ;
    // this.trackLength1= 2.22;
    // this.saturation  = 1.01;
    console.log("srvc is playing:"+this.playerSrvc.isPlaying);
    // this.isPlaying = 'downloading';
    this.playerSrvc.isPlayingChange.subscribe((playerState)=>{
      console.log("playerState:"+playerState);
      this.isPlaying = playerState;
      if(playerState=="playing"){
        this.noTracks = false;
        this.checkFirstandLastTrack();
      }
    })
    this.noTracks = true;
    this.isLastTrack = false;
    this.isFirstTrack = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
  }
  ionViewWillEnter(){
    //assign playlist
    this.playlist = this.playerSrvc.playList;
    this.currentIndex = this.playerSrvc.currentTrackIndex;
    this.trackLength = this.playerSrvc.currentTrackDuration;

    // this.isPlaying = 'downloading';
    console.log("srv playing:"+this.playerSrvc.isPlaying);
    if(!this.playerSrvc.isPlaying){
        console.log("in srvc play undefined");
        if(this.playerSrvc.playList.length>0){
          this.noTracks = false;
        }
        else{
          // this.isPlaying = 'stopped';
          this.isPlaying  = "paused";
          this.playerSrvc.isPlaying  = "paused";
          this.noTracks = true;
        }
        console.log("player page isPlaying:"+this.isPlaying);
    }
    else{
      this.isPlaying = this.playerSrvc.isPlaying;//'downloading';
    }
    if(this.playlist.length>0){
      console.log("playlist is there and lenght:"+this.playlist.length+"currentIndex:"+this.currentIndex);
      this.noTracks = false;
      this.checkFirstandLastTrack();
    }
    else{
      console.log("playlist is wmpty"+this.playlist.length);
      this.noTracks = true;
    }
  }
  play(){
    console.log("play");
    this.playerSrvc.play();
    this.isPlaying = 'playing';//true;
  }
  pause(){
    this.playerSrvc.pause();
    this.isPlaying = 'paused';//false;
  }
  playAudio(trackObj,index){
    var path = window.location.pathname;
    console.log("path:"+"file://"+path+"audios/2.mp3"+"index:"+index);
    let filePath = trackObj;//"audios/2.mp3";
    this.playerSrvc.changeSongInPlayer(trackObj);
    this.currentIndex = index;
    this.playerSrvc.currentTrackIndex = index;
    this.isPlaying = 'playing';//true;
    this.checkFirstandLastTrack();
  }
  clearPlaylist(){
    this.playerSrvc.clearPlaylist();
    this.playlist = [];//this.playerSrvc.playListStatic;
    this.isPlaying = 'paused';//false;
    this.checkFirstandLastTrack();
  }
  playNext(){
    console.log("1");
    this.isPlaying = 'playing';//true;
    console.log("2");
    this.currentIndex+=1;
    console.log("3");
    console.log("this.currentIndex:"+this.currentIndex);
    this.playerSrvc.playIndexed(this.currentIndex);
    console.log("4");
    this.checkFirstandLastTrack();
    console.log("5");
  }
  playPrevious(){
    console.log("1");
    this.isPlaying = 'playing';//true;
    console.log("2");
    this.currentIndex-=1;
    console.log("3");
    console.log("this.currentIndex:"+this.currentIndex);
    this.playerSrvc.playIndexed(this.currentIndex);
    console.log("4");
    this.checkFirstandLastTrack();
    console.log("5");
  }
  showDownloading(){
    this.isPlaying = 'downloading';
  }
  checkFirstandLastTrack(){
    if(this.playerSrvc.playList.length==(this.currentIndex+1)){
      this.isLastTrack = true;
    }
    else{
      this.isLastTrack = false;
    }
    if((this.currentIndex+1)<=1){
      this.isFirstTrack = true;
    }
    else{
      this.isFirstTrack = false;
    }
  }



}
