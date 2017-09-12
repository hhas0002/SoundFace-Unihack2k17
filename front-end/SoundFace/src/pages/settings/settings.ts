import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions
} from '@ionic-native/camera-preview';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {

  public lastImg: string;
  public myEmotion: string;
  public userInfo;

  constructor(public navCtrl: NavController,
    private http: Http) {
     this.userInfo = [
       'Username',
       'E-mail',
       'About',
       'Spotify ID',
       'See what your Friends Feel',
       'Share your Playlist'
    ];
  }

goHome() {
    this.navCtrl.pop();
  }
itemSelected(item){
}
}
