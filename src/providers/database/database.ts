import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare var PouchDB;
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../../model/product';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { PhotoLibrary } from '@ionic-native/photo-library';
interface AppState {
  products: any;
}
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  db;
  productsSource = new BehaviorSubject([]);
  products = this.productsSource.asObservable();

  constructor(
    public http: HttpClient,
    private platform: Platform, 
    private file: File, 
    private fileChooser: FileChooser, 
    private filePath: FilePath,
    private photoLibrary: PhotoLibrary
    ) {
    console.log('Hello DatabaseProvider Provider');
  }

  
  createDatabase() {
    this.db = new PouchDB('db', { skip_setup: true });
    return this.db.info();
  }

  getAllDocs() {
    return this.db.allDocs({include_docs: true, attachments: true})
  }
  addProduct(product: Product) {
    return this.db.post({
      title: product.title,
      image: product.image,
      description: product.description,
      price: product.price,
      type: product.type ,
      date: new Date().getTime()
    });
  }
  updateProduct(product: Product) {
    return this.db.put(product);
  }
  deleteProduct(product: Product) {
    return this.db.remove(product);
  }
  async chooseImage() {
   await this.platform.ready();
   const uri =  await this.fileChooser.open();
   return this.filePath.resolveNativePath(uri);
  }
  
  refreshProducts() {
    this.getAllDocs().then(res => {
      const rows: Array<any> = res.rows;
      this.productsSource.next(rows.filter(row => row.doc.type === 'product'));
    })
  }
  getAllImagePaths() {
   
     return this.photoLibrary.getLibrary();

  }
  getPhotoAuthorization() {
    return this.photoLibrary.requestAuthorization();
  }
  // addProduct(){
	// 	this.store.dispatch({ type: INCREMENT });
  // }
  // fetchDatabase(data){
	// 	this.store.dispatch({ type: FETCH , payload: data});
	// }
}
