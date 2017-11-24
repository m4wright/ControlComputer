import { Component } from '@angular/core';

import { MusicPage } from '../music-page/music-page';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MusicPage;

  constructor() {

  }
}
