import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {Storage} from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AlbumslistPage} from '../pages/albumslist/albumslist';
import {PlayerPage} from '../pages/player/player';
import {TracksPage} from '../pages/tracks/tracks';
import {DownloadsPage} from '../pages/downloads/downloads';

import {Environment} from '../providers/environment';
import {UMServices} from '../providers/um-services';
import {Player} from '../providers/player';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AlbumslistPage,
    PlayerPage,
    TracksPage,
    DownloadsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AlbumslistPage,
    PlayerPage,
    TracksPage,
    DownloadsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Environment,UMServices,Player,Storage]
})
export class AppModule {}
