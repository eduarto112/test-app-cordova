import { Component } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NFC, NdefEvent } from '@awesome-cordova-plugins/nfc/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [InAppBrowser, NFC],
})
export class Tab1Page {
  constructor(
    private platform: Platform,
    private nfc: NFC,
    private iab: InAppBrowser
  ) {}

  openBrowser() {
    const browser = this.iab.create(
      'http://adrspares.ricambio.net/site/pagece5.wplus?ID_COUNT=ce_5_matricola&LN=1&CEPV=ADR001&CELN=1',
      '_blank',
      'location=yes'
    );
    browser.on('loadstop').subscribe(() => {
      browser.executeScript({
        code:
          'document.getElementById("CEmainIntLayerMatricola").style.backgroundColor="red"',
      });
    });
  }

  async startNfc() {
    if (this.platform.is('android')) {
      let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
      this.nfc.readerMode(flags).subscribe(
        (tag) => console.log(JSON.stringify(tag)),
        (err) => console.log('Error reading tag', err)
      );
    } else if (this.platform.is('ios')) {
      try {
        let tag = await this.nfc.scanNdef();
        console.log(JSON.stringify(tag));
      } catch (err) {
        console.log('Error reading tag', err);
      }
    }
  }

  // private onReadSuccess = (tagEvent: NdefEvent) => {
  //   // Handle the NFC tag data here
  //   console.log('NFC Tag Data:', tagEvent.tag);
  // };

  // private onReadError = (err: NdefEvent) => {
  //   console.error('Error reading NFC tag:', err);
  // };
}
