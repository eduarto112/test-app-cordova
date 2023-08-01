import { Component } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [InAppBrowser],
})
export class Tab1Page {
  constructor(private iab: InAppBrowser) {}

  asdf() {
    const browser = this.iab.create(
      'http://adrspares.ricambio.net/site/pagece5.wplus?ID_COUNT=ce_5_matricola&LN=1&CEPV=ADR001&CELN=1'
    );
    browser.on('loadstop').subscribe(() => {
      browser.executeScript({
        code: 'document.body.style.backgroundColor="red"',
      });
    });
  }
}
