import { browser, element, by } from 'protractor';

export class OneWithAngularPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ro-root .title')).getText();
  }
}
