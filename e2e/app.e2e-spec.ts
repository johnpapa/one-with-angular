import { OneWithAngularPage } from './app.po';

describe('one-with-angular App', () => {
  let page: OneWithAngularPage;

  beforeEach(() => {
    page = new OneWithAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('One with Angular');
  });
});
