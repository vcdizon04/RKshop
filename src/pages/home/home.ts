import { Component } from '@angular/core';
import { NavController, Platform, normalizeURL, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs';
// import { ADD, DELETE, UPDATE } from '../../app/product';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { DatabaseProvider } from '../../providers/database/database';
import { ProductActionPage } from '../product-action/product-action';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  url = 'file:///storage/emulated/0/DCIM/Facebook/FB_IMG_1549438954411.jpg';
  counter: Observable<any>;
  products: Array<any>;
  baseProducts: Array<any>;
  constructor(
    public database: DatabaseProvider,
     public navCtrl: NavController,  
     private platform: Platform, 
     private file: File, 
     private fileChooser: FileChooser, 
     private filePath: FilePath,
     private modal: ModalController
     ) {
    // this.database.getAllDocs().then(res => {
    //   console.log(res)
    // })
    this.database.products.subscribe(res => {
      console.log(res)
      this.products = res.sort((a,b) => b.doc.date - a.doc.date);
      this.baseProducts = this.products;
    })
  
    //   this.counter = store.select('counter');
  //   this.counter.subscribe(res => console.log(res))
  //   platform.ready().then(() => {
  //     // this.file.listDir(this.file.externalRootDirectory, 'DCIM').then(_ => {
  //     //   console.log(_, 'Directory exists')
  //     //   alert(JSON.stringify(_))
  //     // }).catch(err =>{
  //     //   console.log(err,'Directory doesn\'t exist')
  //     //   alert('Error: ' + JSON.stringify(err));
  //     // });
  //     this.fileChooser.open()
  // .then(uri => {
  //   console.log(uri);
  //   alert('Success: ' +JSON.stringify(uri));
  //   this.filePath.resolveNativePath(uri)
  //   .then((filePath) => {
  //       alert('Sucess: ' + JSON.stringify(filePath))      
  //       this.url = filePath;

  //   }, (err) => {
  //     alert('ERROR: ' + err)
  //   })
  // })
  // .catch(e => alert(JSON.stringify(e)) )
  //   });
 
  }
  

	// decrement(){
	// 	this.store.dispatch({ type: DECREMENT });
	// }

	// reset(){
	// 	this.store.dispatch({ type: RESET });
  // }

  // getAllProducts() {
  //   this.database.getAllDocs().then(res => {
  //     console.log(res);
  //   })
  // }
  // normalizeURL(url) {
  //   return normalizeURL(url);
  // }

  addProduct() {
    this.modal.create(ProductActionPage, {action: 'Add'}).present();
  }
  viewProduct(product) {
    this.modal.create(ProductActionPage, {action: 'View', product: product}).present();
  }
  search(event) {
    console.log(event);
    this.products = this.baseProducts;
    const val = event.target.value
    if (val && val.trim() != '') {
      this.products = this.products.filter(product => {
        return (product.doc.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
