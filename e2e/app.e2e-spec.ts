import { OneWithAngularPage } from './app.po';

describe('one-with-angular App', () => {
  let page: OneWithAngularPage;

  beforeEach(() => {
    page = new OneWithAngularPage();
  });

  it('should display title of the app', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('One with Angular');
  });
});
