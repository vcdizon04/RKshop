import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, Platform } from 'ionic-angular';
import { Product } from '../../model/product';
import { DatabaseProvider } from '../../providers/database/database';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Base64 } from '@ionic-native/base64';

/**
 * Generated class for the ProductActionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-action',
  templateUrl: 'product-action.html',
})
export class ProductActionPage {
  action;
  btnLeft: String;
  btnRight: String;
  isAdd: Boolean;
  isEdit: Boolean;
  ischooseImage: Boolean;
  images: Array<any> = [];
  product: Product = {
    title: undefined,
    description: undefined,
    price: undefined,
    image: undefined,
    type: 'product'
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public view: ViewController,
    public database: DatabaseProvider, 
    public alert: AlertController, 
    public toast: ToastController,
    public photoLibrary: PhotoLibrary,
    public platform: Platform,
    private base64: Base64
    ) {
    this.action = this.navParams.get('action')
    const currentProduct = this.navParams.get('product');
    if(this.action === 'View') {
      this.product = currentProduct.doc;
      this.btnLeft = 'Edit';
      this.btnRight = 'Delete';
    } else if(this.action === 'Add') {
      this.btnLeft = 'Add';
      this.isAdd = true;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductActionPage');
  }

  doAction(action) {
    console.log(action, this.product)
    if(action === 'Add') {
      this.database.addProduct(this.product).then(res => {
        console.log(res);
        this.toast.create({
          message: 'Product added successfully',
          duration: 2500,
        }).present();
        this.database.refreshProducts();
        this.view.dismiss();
      })
    } else if(action == 'Edit') {
      this.action = 'Edit';
      this.btnLeft = 'Update';
      this.btnRight = 'Delete';
      this.isEdit = true;
    } else if(action === 'Update') {
      this.database.updateProduct(this.product).then(res => {
        console.log('Updated product successfully', res);
        this.toast.create({
          message: 'Product updated successfully',
          duration: 2500,
        }).present();
        this.database.refreshProducts();
        this.view.dismiss();
      })
    } else {
      console.log('delete')
      this.alert.create({
        title: 'Delete Product?',
        message: 'Are you sure you want to <b>delete</b> this product?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.database.deleteProduct(this.product).then(res => {
                console.log('Product Deleted successfuly', res);
                this.toast.create({
                  message: 'Product deleted successfully',
                  duration: 2500,
                }).present();
                this.database.refreshProducts();
                this.view.dismiss();
              })
             
            }
          }
        ]
      }).present();
     
    }
  }

  async chooseImage() {
    // this.product.image = await this.database.chooseImage();
    await this.platform.ready();
    await this.database.getPhotoAuthorization();
    const library = await this.database.getAllImagePaths().toPromise();
    this.images = library;
    this.ischooseImage = true;
    console.log(this.images);
    console.log(this.formatUrl(this.images[0].id));
    this.base64.encodeFile(this.formatUrl(this.images[0].id)).then((base64File: string) => {
      console.log(base64File, 'base64');
    }, (err) => {
      console.log(err);
    });
  }
  copy() {
    const textarea: any = document.getElementById("textarea");
    textarea.select();
    document.execCommand("copy");
  }
  
  formatUrl(url: String) {
    return 'file:///' + url.split(';')[1];
  }
}
