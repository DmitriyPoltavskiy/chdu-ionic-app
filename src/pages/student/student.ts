import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentPage')
  }

  goBack() {
    this.navCtrl.setRoot(HomePage)
    // this.navCtrl.pop()
    // .then(data => console.log('Redirect data', data))
    // .catch(error => console.log('Redirect error', error))
  }
}
