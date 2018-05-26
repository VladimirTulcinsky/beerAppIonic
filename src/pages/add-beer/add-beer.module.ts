import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBeerPage } from './add-beer';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddBeerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBeerPage),
    TranslateModule
  ],
})
export class AddBeerPageModule {}
