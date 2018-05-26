import { BeerProvider } from './../../providers/beer/beer';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
import { Beer } from '../../providers/beer/beer';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map-beer',
  templateUrl: 'map-beer.html',
})
export class MapBeerPage {
  map: GoogleMap;
  mapReady: boolean = false;
  beers: Beer[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private http: HttpClient,
    private beerProvider: BeerProvider,
    private geolocation: Geolocation) {

  }

  getBeers() {
    return new Promise((resolve, reject) => {
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
        resolve();
      }, reject);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapBeerPage');
    this.getBeers().then(res => this.loadMap());
  }

  loadMap() {
    console.log('loadMap');
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)

    this.getCurrentPosition()
      .then((target: any) => {
        console.log(target, "target")
        this.map = GoogleMaps.create('map_canvas', {
          camera: {
            target: {
              lat: target.lat,
              lng: target.lng
            },
            zoom: 18,
            tilt: 30
          }
        });

        // Wait the maps plugin is ready until the MAP_READY event
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
          this.mapReady = true;
          this.setMarkers();
        });
      })
    debugger;


  }

  getCurrentPosition() {
    return new Promise((resolve) => {
      let target = {
        lat: null,
        lng: null
      };
      this.geolocation.getCurrentPosition().then((resp) => {
        let { latitude, longitude } = resp.coords;

        target.lat = latitude;
        target.lng = longitude;
        resolve(target);

      }).catch((error) => {
        target.lat = 50.851781;
        target.lng = 4.351866;
        resolve(target);
        console.log('Error getting location', error);
      });
    })
  }


  setMarkers() {
    this.beers.forEach(item => {
      console.log(item.coordinates, "coordonnées");
      item.coordinates.forEach(coords => {
        this.map.addMarker({
          position: {
            lat: Number(coords.lat),
            lng: Number(coords.lng)
          },
          title: item.name
        });
      })
    })
  }

}
