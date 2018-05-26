import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Beer } from '../../providers/beer/beer';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  beer: Beer;
  isValid = {
    rating: false,
    coords: false
  }
  rating: Number = 0;
  location: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private http: HttpClient) {
    this.beer = this.navParams.get('beer');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  ratingCompleted() {
    this.isValid.rating = true;
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.isValid.coords = true;
      this.location = resp;
      console.log(this.location, "my location");
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  confirm() {


    let coordinates = {
      lat: this.location.coords.latitude,
      lng: this.location.coords.longitude
    };


    if (this.isValid.rating && this.isValid.coords) {
      let body = {
        rating: this.rating,
        coordinates: coordinates
      }
      console.log(body, "body");
      this.http.put('https://beeranking.herokuapp.com/beers/' + this.beer._id,
        JSON.stringify(body),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .toPromise()
        .then(res => console.log(res, "success"))
        .catch(console.log);
    }
    else {
      console.log("not set");
    }
  }

}
