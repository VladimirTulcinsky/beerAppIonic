import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//native plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File, FileEntry } from '@ionic-native/file';


//providers
import { BeerProvider, Beer } from './../../providers/beer/beer';


@IonicPage()
@Component({
  selector: 'page-add-beer',
  templateUrl: 'add-beer.html',
})
export class AddBeerPage {

  taste: string = "";
  pictureExist: boolean = false;
  beerPicture: any = {};
  beer: Beer = {
    _id: "",
    name: "",
    color: "",
    degree: "",
    taste: "",
    brewery: "",
    path: ""
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private beerProvider: BeerProvider,
    public http: HttpClient,
    private transfer: FileTransfer,
    private file: File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBeerPage');
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.pictureExist = true;
      console.log(imageData, "imageData");
      this.beerPicture = {
        uri: imageData,
        type: 'image/jpeg',
        name: 'beer.jpg',
      };
    }).catch(err => this.pictureExist = false);

  }

  addBeer() {
    this.file.resolveLocalFilesystemUrl(this.beerPicture.uri)
      .then(entry => (<FileEntry>entry).file(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newForm = new FormData();
          newForm.append('name', this.beer.name);
          newForm.append('color', this.beer.color);
          newForm.append('degree', this.beer.degree);
          newForm.append('taste', this.beer.taste);
          newForm.append('brewery', this.beer.brewery);
          newForm.append('path', this.beer.path);
          const imgBlob = new Blob([reader.result], { type: file.type });
          newForm.append("beerPicture", imgBlob, file.name);
          this.beerProvider.addOneBeer(newForm);
        }
        reader.readAsArrayBuffer(file);
      }))
      .catch(err => console.log(err));
  }
}
