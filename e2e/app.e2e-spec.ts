import { MeanSeedPage } from './app.po';

describe('mean-seed App', () => {
  let page: MeanSeedPage;

  beforeEach(() => {
    page = new MeanSeedPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
