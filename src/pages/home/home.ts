import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';

//Camera
import { Camera, CameraOptions  } from '@ionic-native/camera';

import { ImagePicker } from '@ionic-native/image-picker';
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  base64Image: string;
  picture:any;

  imageArray = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private alertCtrl: AlertController,
    private imagePicker: ImagePicker
  ) {
  }

  takePic(){

    const options: CameraOptions  = {  //remove CameraOptions 
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA, //included seperatly
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      var title = "Error";
      var subTitle = err;
      this.alert(title,subTitle);
    });
  }

  fileManager(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      var title = "Error";
      var subTitle = err;
      this.alert(title,subTitle);
    });
  }

  imagePickerPlugin(){
    const options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
   //   maximumImagesCount: 1 //Image count
    }


    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
         this.imageArray.push(results[i]);
      }
    }, (err) => { });
  }


  alert(title,subTitle){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Ok']
    });
    alert.present();
  }

}
