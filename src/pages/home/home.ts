import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//providers
import { Beer, BeerProvider } from './../../providers/beer/beer';

//pages
import { DetailsPage } from './../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  beers: Beer[] = [];

  constructor(public navCtrl: NavController, private http: HttpClient, private beerProvider: BeerProvider) {

  }

  ionViewDidEnter() {
    this.getBeers();
  }


  getBeers() {
    this.beers.length = 0;
    console.log("get beers");
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    this.beerProvider.getAllBeers(headers).subscribe(res => {
      console.log(res, "res");
      res.json().map(item => this.beers.push(item));
    }, err => console.log(err, "err"));
  }

  goToDetails(beer: Beer) {
    this.navCtrl.push(DetailsPage, { beer: beer })
  }

}
