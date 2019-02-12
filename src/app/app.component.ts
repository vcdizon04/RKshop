import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';


import { TabsPage } from '../pages/tabs/tabs';
import { DatabaseProvider } from '../providers/database/database';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private file: File, database: DatabaseProvider) {
    platform.ready().then(() => {
      // this.file.listDir(this.file.externalRootDirectory, 'Pictures/Messenger').then(_ => {
      //   console.log(_, 'Directory exists')
      //   alert(JSON.stringify(_))
      // }).catch(err =>{
      //   console.log(err,'Directory doesn\'t exist')
      //   alert('Error: ' + JSON.stringify(err));
      // });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      database.createDatabase().then((res) => {
        console.log(res, 'the database exists.')
        // The database exists.
        // Do something...
        database.getAllDocs().then(res => {
          console.log(res);
          if(res.rows.length > 0) {
            database.productsSource.next(res.rows.filter(row => row.doc.type === 'product'));
          }
        })
      })
      .catch(e => {
        console.log(e,'the database not exists.');
        // No database found and it was not created.
        // Do something else...
      });
    });
  }
}
