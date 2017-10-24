import {HelpPage} from './help.po'

describe('Help Page', () => {
    let page: HelpPage;

    beforeEach(() => {
        page = new HelpPage();
        page.navigateTo();
    });


    it('should highlight title header', () => {
        expect(page.getPageTitle()).toEqual('Welcome to I Am Sage Vocabulary!');
    });
});
