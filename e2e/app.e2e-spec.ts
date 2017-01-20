import { ContactsAppPage } from './app.po';

describe('contacts-app App', function() {
  let page: ContactsAppPage;

  beforeEach(() => {
    page = new ContactsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
