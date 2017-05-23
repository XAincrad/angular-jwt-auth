import { CyonadminPage } from './app.po';

describe('cyonadmin App', () => {
  let page: CyonadminPage;

  beforeEach(() => {
    page = new CyonadminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
