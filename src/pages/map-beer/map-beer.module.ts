import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapBeerPage } from './map-beer';

@NgModule({
  declarations: [
    MapBeerPage,
  ],
  imports: [
    IonicPageModule.forChild(MapBeerPage),
  ],
})
export class MapBeerPageModule {}
