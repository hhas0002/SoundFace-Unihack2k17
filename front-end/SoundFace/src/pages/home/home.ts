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
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Playlist } from "../playlist/playlist";
import { Login } from "../login/login";
import { Settings } from "../settings/settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lastImg: string;
  public myEmotion: string;
  public loginState: boolean = false;

  captureDataUrl: string;

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private cameraPreview: CameraPreview,
    private http: Http,
    public alertCtrl: AlertController) {
    if (!this.loginState) {
      this.logout();
    }
    // this.startCamera();
  }

  startCamera(){
        // let react = {x: 40, y: 100, width: this.calcWidth ,height: 220}   //Decrepted due to previous code
    this.cameraPreview.startCamera({x: 0, y: 0, width: window.innerWidth, height: window.innerHeight, toBack: true, previewDrag: false, tapPhoto: true});
        //.startCamera(react, defaultCamera:'back',tapEnabled: true, dragEnabled: true, toBack:true, alpha:1);  //Decrepeted        
  }

  takePicture() {
    this.camera.getPicture({
      quality: 40,
      destinationType: 0,
      encodingType: 0,
      mediaType: 0,
      sourceType: 1,
      cameraDirection: 1,
      correctOrientation: true
    }).then((imageData) => {
      console.log(imageData);
      this.postRequest(imageData);
    });
  }

  getFromLibrary() {
    this.camera.getPicture({
      quality: 40,
      destinationType: 0,
      encodingType: 0,
      mediaType: 0,
      sourceType: 0,
      cameraDirection: 1,
      correctOrientation: true
    }).then((imageData) => {
      console.log(imageData);
      this.postRequest(imageData);
    });
  }

  // FROM AN EXAMPLE
  postRequest(image) {
    //let hello = 'data:image/jpeg;base64,' + String(image);
    console.log(image);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      img : image
    };

    this.http.post("https://2203bb20.ngrok.io/processImage", JSON.stringify(body), {headers : headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }

  showPlaylist() {
    this.navCtrl.push(Playlist);
  }

  emotionAlert(emotion) {
    let suggest = null;
    if (emotion == "sad" || emotion == "angry") {
      let suggest = "happy"
      let suggestAlert = this.alertCtrl.create({
        title: emotion,
        message: 'SoundFace detected' + emotion + '! Would you rather see a(n) ' + suggest + ' playlist?',
        buttons: ['Yes','No']
      });
      suggestAlert.present()
    }
    let alert = this.alertCtrl.create({
      title: emotion,
      message: 'SoundFace detected' + emotion + '! Do you want to see your playlist?',
      buttons: ['Yes','No']
    });
    alert.present()
  }

  logout() {
    // insert Spotify logout stuff
    this.loginState = true;
    this.navCtrl.push(Login);
  }
goToSettings() {
  this.navCtrl.push(Settings);
  }
}
