import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

//translation
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

//pages
import { HomePage } from '../pages/home/home';
import { MapBeerPage } from './../pages/map-beer/map-beer';
import { AddBeerPage } from '../pages/add-beer/add-beer';
import { DetailsPage } from './../pages/details/details';

//tabs
import { TabsPage } from '../pages/tabs/tabs';

//native plugins
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BeerProvider } from '../providers/beer/beer';

// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddBeerPage,
    MapBeerPage,
    TabsPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    Ionic2RatingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddBeerPage,
    MapBeerPage,
    TabsPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BeerProvider,
    Camera,
    FileTransfer,
    File,
    Geolocation,
    GoogleMaps
  ]
})
export class AppModule { }
