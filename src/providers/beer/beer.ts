import { Http } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BeerProvider {

  constructor(public http: Http) {
    console.log('Hello BeerProvider Provider');
  }

  getAllBeers(headers): Observable<any> {
    return this.http.get("https://beeranking.herokuapp.com/beers", headers);
  }

  addOneBeer(beer): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post("https://beeranking.herokuapp.com/beers", beer)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    }).catch(error => { console.log('caught', error.message); });
  }
}

export interface Beer {
  _id: string,
  name: string,
  color: string,
  degree: string,
  taste: string,
  brewery: string,
  path: string,
  nbrVotes: Number,
  rating: Number,
  coordinates: [{
    lat: String,
    lng: String
  }]
}

