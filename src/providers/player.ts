import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MediaPlugin} from 'ionic-native';
import {Subject} from 'rxjs/Subject';
import { Transfer } from 'ionic-native';
import { File } from 'ionic-native';
import {UMServices} from './um-services';
import {Storage} from '@ionic/storage';

/*
  Generated class for the Player provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var cordova: any;
@Injectable()
export class Player {

   tracksMasterJSON:any;
   playList:any;
   playerStatic:any;
   isPlayerCreated:boolean;
   isPlaying:any;
   noTracks:any;
   currentTrackIndex:number;
   currentAlbumID:any;
   currentTrackID:any;
   currentTrackDuration:number;
   isPlayingChange:Subject<string>=new Subject<string>();
  constructor(public http: Http, private umservices:UMServices, private appStorage:Storage) {
    console.log('Hello Player Provider');
    this.playList = []; //initialize to empty and look for local n update
    this.appStorage.get('savedPlaylist').then((storedList)=>{
      if(storedList!=null){
          this.playList = storedList;
      }

    });
  }
  changePlayerState(newState){
    console.log("playerStateChange:"+newState);
    this.isPlaying = newState;
    this.isPlayingChange.next(this.isPlaying);
  }
  play(){
    this.changePlayerState('playing');
    this.playerStatic.play();
  }
  pause(){
    this.changePlayerState('paused');
    this.playerStatic.pause();
  }
  stop(){
    this.changePlayerState('stopped');
  }
  startPlayer(trackObj){
    console.log("in startPlayer");
    if(this.playerStatic)
    {
      this.playerStatic.stop();
    }
    //check if already there in playlist
    console.log("in startPlayer")
    let isThereInPlayList = this.checkPlaylist(trackObj);
    if(!isThereInPlayList){
      //if not in playlist check downloads
      this.checkDownloads(trackObj.id);
      console.log("not found in playlist");
        let remoteurl = trackObj.remoteUrl;
        var filename = remoteurl.substring(remoteurl.lastIndexOf('/')+1);
        let objWithInternalPath = this.addInternalPathToTrack(trackObj,filename);
        console.log("objWithInternalPath:"+JSON.stringify(objWithInternalPath));
        this.checkAndAddTrack(objWithInternalPath);
        this.updatePlayerMasterJSON(objWithInternalPath);
        console.log("after checkAndAddTrack");
        this.changePlayerState('downloading');
        const fileTransfer = new Transfer();
        fileTransfer.download(trackObj.remoteUrl,cordova.file.dataDirectory+"audio/"+trackObj.albumId+"_"+filename).then((entry)=>{
          console.log("download completed:"+entry.toURL());
          console.log("masterJSON:"+JSON.stringify(this.tracksMasterJSON));
          this.changeSongInPlayer(trackObj);//entry.toURL()


        },(err)=>{
          console.log("download error:"+err);
        })
    }
    else{
      //if there already play the song
      console.log("found in playlist");
      this.changeSongInPlayer(trackObj);//entry.toURL()
    }

  }

  checkPlaylist(track){
    console.log("in checkPlaylist1");
    let found:boolean=false;
    try{

      if(track && this.playList.length>0){
        if(typeof(this.playList) == undefined){
          // this.playListStatic = new Array();
          console.log("undefined");
          this.playList = [];
        }
        console.log("in checkPlaylist:this.playListStatic:");
        for(let oneTrack of this.playList){
          if(oneTrack.id==track.id){
            if(oneTrack.localUrl!="" && oneTrack.localUrl!=null && oneTrack.localUrl!= undefined && oneTrack.localUrl!= 'undefined' ){
              console.log("localUrl:"+oneTrack.localUrl);
                return true;
            }

          }
        }
        if(found==false){
          return false;
        }
      }
      else{
        return false;
      }
    }
    catch(e){
      console.log("exception:"+e.message);
    }
    return found;
  }

  checkAndAddTrack(selectedTrack){
    try{
    console.log("in checkAndAddTrack1"+JSON.stringify(selectedTrack));
    if(typeof(this.playList)==undefined){
      // this.playListStatic = new Array();
      console.log("undefined");
    }
    this.playList.push(selectedTrack);
    console.log('playList:'+this.playList);
    this.updatePlaylistInStorage(this.playList);

    console.log("added");
    }
    catch(e){
      console.log("exception:"+e.message);
    }

  }

  updatePlaylistInStorage(updatedList){
    try{
      if(updatedList){
        this.appStorage.set('savedPlaylist',updatedList);
      }
    }
    catch(e){

    }
  }
  updatePlayerMasterJSON(track){
    if(track){
      for(let oneAlbum of this.tracksMasterJSON.Albums){
        for(let oneTrack of oneAlbum.tracks){
          if(oneTrack.id==track.id){
            oneTrack.localUrl = track.localUrl;
          }
        }
      }
    }
    console.log("masterJSON: in tracksMasterJSON"+this.tracksMasterJSON);
    this.appStorage.set('tracksMasterJSON',this.tracksMasterJSON);
  }
  addInternalPathToTrack(trackObj,filename){
    let libPath = "cdvfile://localhost/library-nosync/audio/";
    let internalFilePath = libPath+trackObj.albumId+"_"+filename;
    trackObj["localUrl"] = internalFilePath;
    console.log("localUrl in addInternalPathToTrack:"+internalFilePath);
    return trackObj;
  }
  changeSongInPlayer(trackObj){
    try{
      if(this.playerStatic){
        this.playerStatic.stop();
      }

      const onStatusPlayerUpdate = (status) =>{
        //status - 4 done, 2 -start.
        console.log("status update:"+status);

      };
      console.log("localUrl in changeSongInPlayer:"+trackObj.localUrl);
      let mediaUrl = (trackObj.localUrl)?trackObj.localUrl:trackObj.remoteUrl;
      this.playerStatic = new MediaPlugin(mediaUrl,onStatusPlayerUpdate); //"cdvfile://localhost/library-nosync/audio/a.mp3"

      this.playerStatic.play();
      this.currentTrackDuration = trackObj.length;
      this.changePlayerState('playing');

    }
    catch(e){
      console.log("exception:"+e);
    }
  }
  playIndexed(index){
    this.playerStatic.stop();
    if(this.playList.length>=(index)){
      console.log("this.playListStatic[index]:"+JSON.stringify(this.playList[index]));
      this.changeSongInPlayer(this.playList[index]);
    }else{
      this.changePlayerState('paused');
    }
  }

  updateMasterJSON(tracksJson){
    if(tracksJson){
      // if(!this.tracksMasterJSON){
        //check storage
        console.log("in updateMasterJSON");
        this.appStorage.get('tracksMasterJSON').then((localMasterJSON)=>{
          console.log('localMasterJSON in update:'+JSON.stringify(localMasterJSON));
          if(localMasterJSON!=null && localMasterJSON.Albums.length>0){
            // this.tracksMasterJSON = masterJSON;
            for(let oneAlbum of tracksJson.Albums){
              for(let oneLocalAlbum of localMasterJSON.Albums){
                if(oneAlbum.id==oneLocalAlbum.id){
                  //loop through tracks and copy localUrl
                  for(let oneTrack of oneAlbum.tracks){
                    for(let oneLocalTrack of oneLocalAlbum.tracks){
                      if(oneTrack.id==oneLocalTrack.id){
                        oneTrack.localUrl = oneLocalTrack.localUrl;
                        console.log("localUrl while updating:"+oneTrack.localUrl);
                      }
                    }
                  }
                }
              }
            }
            //copy lates master json to local storage
            console.log("before setting masterJSON:"+JSON.stringify(tracksJson));
            this.appStorage.set('tracksMasterJSON',tracksJson);
          }
          else{
            //no masterJSON
            console.log("no masterJSON");
            this.tracksMasterJSON = tracksJson;
            this.appStorage.set('tracksMasterJSON',tracksJson);
          }
        },(err)=>{
          console.log("master json not found in local");
          this.tracksMasterJSON = tracksJson;
          this.appStorage.set('tracksMasterJSON',tracksJson);
        })
      // }

    }
  }
  seekTo(){

  }
  setPlayer(){

  }
  getPlayer(){
    return this.playerStatic;
  }
  clearPlaylist(){
    this.playerStatic.stop();
    this.playerStatic.release();
    this.playList=[];
  }
  getAudioLength(){
    console.log("in get duration");

  }
  checkDownloads(id){
    var path = window.location.pathname;
    console.log("path:"+"file://"+path+"audios/2.mp3");
  }

}
