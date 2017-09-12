import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions
} from '@ionic-native/camera-preview';
import { HttpModule } from '@angular/http';

import { SoundFace } from './app.component';
import { HomePage } from '../pages/home/home';
import { Playlist } from "../pages/playlist/playlist";
import { Login } from "../pages/login/login";
import { Settings } from "../pages/settings/settings";

@NgModule({
  declarations: [
    SoundFace,
    HomePage,
    Playlist,
    Login,
    Settings
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(SoundFace)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SoundFace,
    HomePage,
    Playlist,
    Login,
    Settings
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    CameraPreview,
    HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
