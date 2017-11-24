import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular/index';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-music-page',
  templateUrl: 'music-page.html',
})
export class MusicPage {
  //private readonly address = "http://192.168.0.190";                    // home
  //private readonly address = "http://192.168.43.56";                    // phone
  // private readonly address = "http://192.168.2.11;"                    // apartment laptop
  private readonly address = "http://192.168.2.11";                       // apartment desktop  


  private readonly port = "10000";
  private readonly url: string = this.address + ":" + this.port + "/control_app";    
  
  volume = 50;
  songs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,
     private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  private sendCommand(command, args?) {
    let data: any = {command: command};
    if (args) {
      data['args'] = args;
    }
    return this.http.get(this.url, { params: data }).map(result => result.json());
  }

  private createAlert(message) {
    let alert = this.alertCtrl.create({
      title: "Message",
      message: message,
      buttons: [ 'Dismiss' ]
    });
    alert.present();
  }

  getKeys(array) {
    return Object.keys(array);
  }

  ionViewDidLoad() {
    this.getVolume();
    this.getMusic();
  }

  getVolume() {
    this.sendCommand('get_volume').subscribe(
      volume => {
        this.volume = parseInt(volume);
      }, error => {
        console.log("get_volume error: " + error);
      }
    );
  }

  changeVolume(volume: number): void {
    this.sendCommand('set_volume', volume).subscribe(
      success => {
        console.log(success);
      }, error => {
        console.log("change_volume error: " + error);
      }
    )
  }

  getMusic(): void {
    this.sendCommand('get_music').subscribe(
      songs => {
        this.songs = songs;
      }, error => {
        console.log("get_music error: " + error);
      }
    )
  }

  playSong(song) {
    let loading = this.loadingCtrl.create({
      content: "Playing " + song,
      spinner: 'circles'
    });
    loading.present();
    this.sendCommand('play', this.songs[song]).subscribe(
      success => {
        loading.dismiss();
        console.log(success);
      }, error => {
        loading.dismiss();
        this.createAlert("Error playing song: " + error);
        console.log("Error playing " + song + ": " + error);
      }
    );
  }

  pause() {
    this.sendCommand('pause').subscribe(
      success => {
        console.log(success);
      }, error => {
        console.log("Error pausing: " + error);
      }
    );
  }

  play() {
    this.sendCommand('play').subscribe(
      success => {
        console.log(success);
      }, error => {
        console.log("Error pressing play: " + error);
      }
    );
  }

  playPause() {
    this.sendCommand('toggle_play').subscribe(
      success => {},
      error => {
        console.log("Error toggling play: " + error);
      }
    )
  }

  nextSong() {
    this.sendCommand('next').subscribe(
      success => {
        console.log(success);
      }, error => {
        console.log("Error playing next song: " + error);
      }
    );
  }

    previousSong() {
    this.sendCommand('previous').subscribe(
      success => {
        console.log(success);
      }, error => {
        console.log("Error playing previous song: " + error);
      }
    );
  }

}
