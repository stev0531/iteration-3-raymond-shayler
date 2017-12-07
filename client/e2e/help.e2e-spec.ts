import {HelpPage} from './help.po'

describe('Help Page', () => {
    let page: HelpPage;

    beforeEach(() => {
        page = new HelpPage();
        page.navigateTo();
    });


    it('should highlight title header', () => {
        expect(page.getPageTitle()).toContain('Help & Rules');
    });

    it('should have five headings', () => {
        expect(page.getBySelector('section-overview')).toBeTruthy();
        expect(page.getBySelector('section-guesser')).toBeTruthy();
        expect(page.getBySelector('section-judge')).toBeTruthy();
        expect(page.getBySelector('section-score')).toBeTruthy();
        expect(page.getBySelector('section-cards')).toBeTruthy();
    });



    //This test never worked, is left here in case a solution becomes clear,
    // and so it can be included in at least one commit.
    // it("should have a function drawer", ()=> {
    //     page.navigateToSpecific("help");
    //     browser.sleep(500);
    //     expect(browser.getCurrentUrl()).toContain("help");
    //     page.clickBySelector(".nav-launch");
    //     browser.sleep(500);
    //     page.clickBySelector(".nav-link-home");
    //     expect(browser.getCurrentUrl()).toContain("home");
    //     expect(browser.getCurrentUrl()).not.toContain("help");
    //
    //     page.clickBySelector(".nav-launch");
    //     browser.sleep(500);
    //     page.clickBySelector(".nav-link-help");
    //     expect(browser.getCurrentUrl()).toContain("help");
    //     expect(browser.getCurrentUrl()).not.toContain("home");
    // })

});
