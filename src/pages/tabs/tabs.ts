import { Component } from '@angular/core';

//pages
import { HomePage } from '../home/home';
import { AddBeerPage } from './../add-beer/add-beer';
import { MapBeerPage } from './../map-beer/map-beer';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddBeerPage;
  tab3Root = MapBeerPage;

  constructor() {

  }
}
