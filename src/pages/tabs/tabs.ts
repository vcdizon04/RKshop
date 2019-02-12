import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public database: DatabaseProvider) {
    // this.database.getAllDocs().then(res => {
    //   console.log(res);
    // })
  }
}
